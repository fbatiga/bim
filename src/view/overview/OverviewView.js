'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import OverviewStyle from './OverviewStyle';
import baseStyles from '../../asset/styles.js';
import asset from '../../asset';


import {connect} from 'react-redux';



class AccountView extends Component {

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        let categories = {};
        this.props.account.categories.map((value) => {
            categories[value.categoryId] = value;
        });

        this.state = {
            filterIndex: 0,
            currentTab: 'all',

            dataSource: dataSource.cloneWithRows(this.props.account.transactions)
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
            horizontal={false} style={OverviewStyle.container}>
                <View style={OverviewStyle.top}>
                    <Text style={baseStyles.titles.h1}>Finances</Text>
                    <ScrollView
                    horizontal={true}>
                         {this.props.account.categories.map((value, key) => {
                             return (
                                 <View>
                             <View style={OverviewStyle.graph}>
                                 <Image source={asset.graphCircle}  style={OverviewStyle.graphCircle}>
                                     <Text style={OverviewStyle.graphLabel} >SOLDE ACTUEL JUIN</Text>
                                     <Text style={OverviewStyle.graphBalance} >{this.props.account.balance} €</Text>
                                 </Image>
                             </View>
                             <View style={OverviewStyle.dotIcon}>
                                 <Image source={asset.dotIcon}  style={{alignItems: 'center', justifyContent: 'center'}} />
                             </View>
                                     </View>
                             );
                         })}
                    </ScrollView>
                </View>

                <View style={OverviewStyle.bottom}>
                    <View>
                        <Text style={[baseStyles.titles.h1, OverviewStyle.bottomTitle]} >Juin</Text>
                    </View>
                    <View style={OverviewStyle.switchContainer}>
                        <SegmentedControlIOS style={OverviewStyle.switch} tintColor={baseStyles.colors.deepBlue} enabled={true} values={['Tout', 'Sorties', 'Entrées']} selectedIndex={this.state.filterIndex}
                        onChange={(event) => {
                            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                            console.log(event.nativeEvent.selectedSegmentIndex);
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
                    style={OverviewStyle.listView}
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
        this.setState({
            'dataSource': this.state.dataSource.cloneWithRows(this.getTransactions(cat)),
            filterIndex: 0,
            currentTab: cat || 'all'
        });
    }

    getTransactions(cat) {
        var source = this.props.account.transactions;
        if (cat) {
            this.state.currentTab = cat;
        }
        if (this.state.currentTab == 'all') {
            return source;
        }
        else {
            return source.filter((elm) => {
                console.log(elm.category.categoryId, this.state.currentTab, elm.category.categoryId === this.state.currentTab);
                return elm.category.categoryId === this.state.currentTab;
            });
        }
    }
}

function mapStateToProps(state) {
    return {
        account: state.account
    };
}

export default connect(mapStateToProps)(AccountView);
