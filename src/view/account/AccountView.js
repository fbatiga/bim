'use strict';

import React, { Component } from 'react';
import { View, Text, Modal, ListView, Image, ScrollView, SegmentedControlIOS, TouchableOpacity, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {firebaseDb} from  '../../app/AppFirebase';

import AccountStyle from './AccountStyle';
import baseStyles from '../../styles/vars';
import asset from '../../asset';


import {connect} from 'react-redux';
import {init, filterByCredit, filterByDebit, clearFilter} from './AccountAction';
import AccountItem from './item/AccountItem';
import AccountTab from './item/AccountTab';

const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

class AccountView extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });


        this.props.account.transactions = [];


        var categories = {};
        this.props.account.categories.map((value, key) => {
            categories[value.categoryId] = value;
        });
        this.categories = categories;

        const rootRef = firebaseDb.ref();
        this.transactionsRef = rootRef.child('alice/transactions');

        this.state = {
            filterIndex: 0,
            currentTab: 'all',
            previousMonth: 'Mai',
            currentMonth: 'Juin',
            balance: this.props.account.balance,
            dataSource: ds,
            modalVisible: false,
            fadeAnim: new Animated.Value(0),
            bounceValue: new Animated.Value(0),
            slideIn: new Animated.Value(100)
        };
    }

    componentDidMount() {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1
        }
      ).start();

      Animated.timing(
        this.state.bounceValue,
        {
          delay: 200,
          toValue: 1,
          friction: 10,
          tension: 40
        }
      ).start();

      Animated.timing(
        this.state.slideIn,
        {
          delay: 200,
          toValue: 0,
          friction: 10,
          tension: 40
        }
      ).start();

        this.props.dispatch(init());

        var that = this;
        this.transactionsRef.once("value").then(function (snapshot) {

            that.props.account.transactions = [];
            snapshot.forEach((elm) => {

                elm = elm.val();
                elm.category = that.categories[elm.category];

                // console.log(elm.category);
                that.props.account.transactions.unshift(elm);
            });

            that.setState({dataSource: that.state.dataSource.cloneWithRows(that.props.account.transactions)});
        }, function (err) {
            console.log(err);
        });
        this.listenToTransactionChanges(this.transactionsRef);
    }

    listenToTransactionChanges(source) {
        var that = this;
        source.orderByChild('timestamp').on('child_added', (snapshot)=> {
            snapshot = snapshot.val();
            // console.log(snapshot);
            snapshot.category = that.categories[snapshot.category];
            // inserting at the beginning of the array

            that.props.account.transactions.unshift(snapshot);
            this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.account.transactions)});
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    render() {
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={AccountStyle.transferButton} onPress={()=> { this.setModalVisible(!this.state.modalVisible); }}>
              <Image source={asset.transfer}  style={AccountStyle.transferButtonImage} />
            </TouchableOpacity>
            <ScrollView>
                  <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.modalVisible}
                  >

                      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                          <View style={{height: 200, flex: 1}}>
                              <TouchableOpacity style={AccountStyle.closeModalButton} onPress={()=> {
                                  this.setModalVisible(false);
                              }}>
                                  <Image source={asset.close}  style={{resizeMode: 'contain', width: 70}} />
                              </TouchableOpacity>
                              <TouchableOpacity style={AccountStyle.modalList}
                              onPress={() => {
                                  Actions.transfer({mode: 'transfer'});
                                  this.setModalVisible(false);
                              }}>
                                <View style={AccountStyle.modalContent}>
                                  <Text>Faire un transfert</Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={AccountStyle.modalList}
                              onPress={() => {
                                  Actions.transfer({mode: 'bim'});
                                  this.setModalVisible(false);
                              }}>
                                <View style={AccountStyle.modalContent}>
                                  <Text>Faire un Bim</Text>
                                </View>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </Modal>

                  <View style={AccountStyle.top}>

                      <Text style={baseStyles.titles.h1Dark}>B!M</Text>

                      <Animated.View style={[AccountStyle.graph, { transform: [ {scale: this.state.bounceValue} ] }]}>
                          <Image source={asset.graphCircled}  style={AccountStyle.graphCircle}>
                              <Text style={AccountStyle.graphLabel} >SOLDE ACTUEL</Text>
                              <Text style={AccountStyle.graphBalance} >{this.state.balance} €</Text>
                          </Image>
                      </Animated.View>

                      <View style={AccountStyle.tabs}>
                        <ScrollView
                          style={AccountStyle.tabsContainer}
                          contentContainerStyle={AccountStyle.tabsContent}
                          horizontal={true}
                          automaticallyAdjustInsets={false}
                          decelerationRate={0}
                          snapToInterval={themeWidth + themeMargin*2}
                          snapToAlignment="center">
                            {this.props.account.categories.map((value, key) => {
                              return (<AccountTab rowData={value} callback={this.filterByCategory.bind(this)} key={key} />);
                            })}
                        </ScrollView>
                      </View>
                  </View>

                  <Animated.View style={[AccountStyle.bottom, { marginTop: this.state.slideIn }]}>
                      <View style={AccountStyle.dateContainer}>
                          <View style={AccountStyle.dateLeft}>
                            <Text style={AccountStyle.previousMonth} >{this.state.previousMonth}</Text>
                          </View>
                          <View style={AccountStyle.dateCenter}>
                            <Text style={[baseStyles.titles.h1, AccountStyle.bottomTitle]} >{this.state.currentMonth}</Text>
                          </View>
                          <View style={AccountStyle.dateRight} />
                      </View>

                      <View style={AccountStyle.switchContainer}>
                          <SegmentedControlIOS style={AccountStyle.switch} tintColor={baseStyles.colors.lightviolet} enabled={true} values={['Tout', 'Sorties', 'Entrées']} selectedIndex={this.state.filterIndex}
                          onChange={(event) => {
                              switch (event.nativeEvent.selectedSegmentIndex) {
                                  case 0:
                                      this.filterByAll();
                                      break;
                                  case 1:
                                      this.filterByDebit();
                                      break;
                                  case 2:
                                      this.filterByCredit();
                                      break;
                              }
                          }}
                          />
                      </View>
                      <ListView
                      style={AccountStyle.listView}
                      ref="listView"
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                      />
                  </Animated.View>
            </ScrollView>
          </View>
        );
    }

    renderRow(rowData) {
        return (
            <AccountItem
            rowData={rowData}
            />
        );
    }

    renderTabRow(rowData) {
        return (
            <View>
                <AccountTab
                rowData={rowData}
                />
            </View>
        );
    }

    filterByAll() {
        this.state.dataSource = this.state.dataSource.cloneWithRows(this.getTransactions());
        return;
    }

    filterByDebit() {
        this.setState({
            'dataSource': this.state.dataSource.cloneWithRows(this.getTransactions().filter((elm) => {
                return elm.type === 'debit';
            }))
        });

    }

    filterByCredit() {
        this.setState({
            'dataSource': this.state.dataSource.cloneWithRows(this.getTransactions().filter((elm) => {
                return elm.type === 'credit';
            }))
        });
    }

    filterByCategory(cat) {
        console.log('INDEX', this.state.filterIndex);
        this.setState({
            filterIndex: 0,
            currentTab: cat || 'all',
            'dataSource': this.state.dataSource.cloneWithRows(this.getTransactions(cat))
        });
    }

    getTransactions(cat) {
        var source = this.props.account.transactions;

        if (cat) {
            this.state.currentTab = cat;
        }
        if (this.state.currentTab == 'all') {
            this.state.balance = this.props.account.balance;
            return source;
        }
        else {
            console.log('PREVIOUSMONTH', this.props.account.previousMonthBalance);
            var newBalance = this.props.account.previousMonthBalance;
            var out = source.filter((elm) => {
                if (elm.category.categoryId === this.state.currentTab) {
                    newBalance += parseFloat(elm.amount);
                    console.log(elm.label, elm.amount, this.state.balance + elm.amount);
                    console.log('BALANCE AFTER OPERATION', this.state.balance);

                    return true;
                }
                else {
                    return false;
                }
                return;
            });

            this.setState({'balance': newBalance});
            return out;
        }
    }
}

function mapStateToProps(state) {
    return {
        account: state.account
    };
}

export default connect(mapStateToProps)(AccountView);
