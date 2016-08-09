'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import AccountStyle from './AccountStyle';
import baseStyles from '../../asset/styles.js';

import {connect} from 'react-redux';
import {init} from './AccountAction';
import AccountItem from './item/AccountItem';
import AccountTab from './item/AccountTab';


class AccountView extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        this.state = {
            dataSource: ds.cloneWithRows([
                {label: 'virement de xxx', amount: 1000, type: "debit", category: "all", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de yy', amount: 1000, type: "debit", category: "dab", timestamp: new Date()},
                {label: 'virement de zz', amount: 1000, type: "debit", category: "shopping", timestamp: new Date()}
            ]),
            tabSource: ds.cloneWithRows([
                {label: 'TOUTES', categoryId: "all"},
                {label: 'BARS ET RESTAURANTS', categoryId: "bar-restaurants"},
                {label: 'ABONNEMENTS', categoryId: "dab"},
                {label: 'Retraits', categoryId: "dab"},
                {label: 'Achats & shopping', categoryId: "shopping"},
                {label: 'Maison', categoryId: "maison"}
            ])
        };
        console.log(this);
    }


    componentDidMount() {
        this.props.dispatch(init());

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const tabs = [
            {label: 'Toutes', categoryId: "all"},
            {label: 'Bars et Restaurants', categoryId: "bar-restaurants"},
            {label: 'Bars et Restaurants', categoryId: "bar-restaurants"},
            {label: 'Bars et Restaurants', categoryId: "bar-restaurants"},
            {label: 'Bars et Restaurants', categoryId: "bar-restaurants"},
            {label: 'Bars et Restaurants', categoryId: "bar-restaurants"},
            {label: 'Retraits', categoryId: "dab"},
            {label: 'Retraits', categoryId: "dab"},
            {label: 'Achats & shopping', categoryId: "shopping"},
            {label: 'Maison', categoryId: "maison"}
        ];
        return (
            <View style={AccountStyle.container}>

                <View style={AccountStyle.top}>
                    <Text style={baseStyles.titles.h1}>Finances</Text>

                    <ScrollView
                    horizontal={true}
                    style={{height: 100, overflow: 'hidden'}}
                    >
                {tabs.map((value, key) => {
                    return (<AccountTab rowData={value} key={key} />);
                })}
                    </ScrollView>

                    <View style={AccountStyle.graph}>
                    <Text>Graph {AccountStyle.top.flex}</Text>
                        </View>
                </View>

                <View style={AccountStyle.bottom}>
                    <ListView
                    style={{flex: 1}}
                    ref="listView"
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    />
                </View>
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
}


function mapStateToProps(state) {
    return {
        account: state.account
    };
}

export default connect(mapStateToProps)(AccountView);
