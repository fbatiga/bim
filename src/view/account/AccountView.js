'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView, SegmentedControlIOS} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import AccountStyle from './AccountStyle';
import baseStyles from '../../asset/styles.js';
import asset from '../../asset';


import {connect} from 'react-redux';
import {init, filterByCredit, filterByDebit, clearFilter} from './AccountAction';
import AccountItem from './item/AccountItem';
import AccountTab from './item/AccountTab';


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
            horizontal={false} style={AccountStyle.container}>

                <View style={AccountStyle.top}>
                    <Text style={baseStyles.titles.h1}>Finances</Text>

                    <View style={AccountStyle.graph}>
                        <Image source={asset.graphCircle}  style={AccountStyle.graphCircle}>
                            <Text style={AccountStyle.graphLabel} >SOLDE ACTUEL JUIN</Text>
                            <Text style={AccountStyle.graphBalance} >{this.props.account.balance} €</Text>
                        </Image>
                    </View>
                    <View style={AccountStyle.dotIcon}>
                        <Image source={asset.dotIcon}  style={{alignItems: 'center', justifyContent: 'center'}} />
                    </View>

                    <View style={AccountStyle.tabs}>
                        <ScrollView
                        horizontal={true}>
                {this.props.account.categories.map((value, key) => {
                    return (<AccountTab rowData={value} callback={this.filterByCategory.bind(this)} key={key} />);
                })}
                        </ScrollView>
                    </View>
                </View>

                <View style={AccountStyle.bottom}>
                    <View>
                        <Text style={[baseStyles.titles.h1, AccountStyle.bottomTitle]} >Juin</Text>
                    </View>
                    <View style={AccountStyle.switchContainer}>
                        <SegmentedControlIOS style={AccountStyle.switch} tintColor={baseStyles.colors.deepBlue} enabled={true} values={['Tout', 'Sorties', 'Entrées']} selectedIndex={this.state.filterIndex}
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
