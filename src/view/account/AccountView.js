'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView, SegmentedControlIOS, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import AccountStyle from './AccountStyle';
import baseStyles from '../../asset/styles.js';
import asset from '../../asset';


import {connect} from 'react-redux';
import {init, filterByCredit, filterByDebit, clearFilter} from './AccountAction';
import AccountItem from './item/AccountItem';
import AccountTab from './item/AccountTab';
import MessengerFabButton from '../messenger/item/MessengerFabButton.js';


class AccountView extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        let categories = {};
        this.props.account.categories.map((value, key) => {
            categories[value.categoryId] = value;
        });

        this.state = {
            filterIndex: 0,
            currentTab: 'all',
            currentMonth: 'JUIN',
            balance: this.props.account.balance,
            dataSource: ds.cloneWithRows(this.props.account.transactions)
        };
    }

    componentDidMount() {
        this.props.dispatch(init());

    }

    componentWillReceiveProps(nextProps) {
        /* this.state = {
         dataSource: nextProps.dataSource.cloneWithRows(this.props.account.transactions)
         };
         */
    }

    render() {
        return (
            <ScrollView
            horizontal={false} style={AccountStyle.container}>

                <View style={AccountStyle.top}>
                    <MessengerFabButton />

                    <Text style={baseStyles.titles.h1}>Finances</Text>

                    <View style={AccountStyle.graph}>
                        <Image source={asset.graphCircle}  style={AccountStyle.graphCircle}>
                            <Text style={AccountStyle.graphLabel} >SOLDE ACTUEL {this.state.currentMonth}</Text>
                            <Text style={AccountStyle.graphBalance} >{this.state.balance} €</Text>
                        </Image>
                    </View>
                    <TouchableOpacity style={AccountStyle.dotIcon} onPress={()=> {
                        Actions.overview()
                    }}>
                        <Image source={asset.dotIcon}  style={{alignItems: 'center', justifyContent: 'center'}} />

                    </TouchableOpacity>

                    <View style={AccountStyle.tabs}>
                        <ScrollView
                        horizontal={true}>
                        {this.props.account.categories.map((value, key) => {
                            return (<AccountTab rowData={value} callback={this.filterByCategory.bind(this)} key={key} />);
                        })}
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={{'position': 'absolute', bottom:-40, right: 20, borderRadius:100, padding:0}} onPress={()=> {
                        Actions.overview()
                    }}>
                        <Image source={asset.add}  style={{alignItems: 'center', justifyContent: 'center', resizeMode:'contain', width:80, height:80}} />
                    </TouchableOpacity>
                </View>

                <View style={AccountStyle.bottom}>
                    <View>
                        <Text style={[baseStyles.titles.h1, AccountStyle.bottomTitle]} >{this.state.currentMonth.toUpperCase()}</Text>
                    </View>
                    <View style={AccountStyle.switchContainer}>
                        <SegmentedControlIOS style={AccountStyle.switch} tintColor={baseStyles.colors.deepBlue} enabled={true} values={['Tout', 'Sorties', 'Entrées']} selectedIndex={this.state.filterIndex}
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
                </View>
            </ScrollView>
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
        console.log('INDEX',this.state.filterIndex);
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
                    newBalance += elm.amount;
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
