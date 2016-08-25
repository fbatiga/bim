'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { ScrollableTabBar }  from 'react-native-scrollable-tab-view';
import moment from 'moment';

import OverviewStyle from './OverviewStyle';
import {init} from './OverviewAction';
import asset from '../../asset';
import baseStyles from '../../styles/vars.js';
import MessengerFabButton from '../messenger/item/MessengerFabButton.js';
import Title from '../../component/Title.js';

import {connect} from 'react-redux';


class OverviewView extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        console.log(this.props.overview.accounts);
        this.state = {
            filterIndex: 0,
            currentTab: 'all',
            currentMonth: 'JUIN',
            dataSource: ds.cloneWithRows(this.props.overview.accounts)
        };
    }

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {
        /* this.state = {
         dataSource: nextProps.dataSource.cloneWithRows(this.props.overview.transactions)
         };
         */
    }

    render() {
        return (
            <View
            horizontal={false} style={[OverviewStyle.container, { flex: 1 }]}>
                <View style={[OverviewStyle.top, { flex: 1 }]}>
                    <MessengerFabButton />
                    <Text style={baseStyles.titles.h1}>Comptes</Text>

                    <View>
                      <ScrollableTabView
                      style={{marginTop: 20}}
                      initialPage={0}
                      tabBarPosition={'bottom'}
                      tabBarUnderlineColor={'transparent'}
                      tabBarActiveTextColor={'white'}
                      tabBarInactiveTextColor={baseStyles.colors.lightviolet}
                      renderTabBar={() => <ScrollableTabBar style={{ borderBottomWidth: 0 }}/>}
                      >
                             {this.props.overview.accounts.map((value, key) => {
                                 return (
                                     <View tabLabel={value.label} key={key}>
                                         <TouchableOpacity style={OverviewStyle.graph} onPress={()=> {
                                             value.type === 'jackpot' ? Actions.jackpot() : Actions.account()
                                         }}>
                                             <View style={[OverviewStyle.graphCircle , {backgroundColor: (value.type== 'internal' ? baseStyles.colors.alternative :this.randomizeColor())}]}>
                                                 <Text style={OverviewStyle.graphLabel} >SOLDE ACTUEL</Text>
                                                 <Text style={OverviewStyle.graphBalance} >{value.balance} €</Text>
                                             </View>
                                         </TouchableOpacity>
                                     </View>
                                 );
                             })}
                      </ScrollableTabView>
                    </View>
                </View>

                <View style={OverviewStyle.addIcon}>
                  <TouchableOpacity style={OverviewStyle.graph} onPress={()=> {
                      Actions.addAccount()
                  }}>
                    <Image source={asset.add} style={{
                      width: 70,
                      height: 70
                    }} />
                  </TouchableOpacity>
                </View>
            </View>
        );
    }

    randomizeColor() {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          return baseStyles.colors.white;
          break;
        case 1:
          return baseStyles.colors.pink;
          break;
        case 2:
          return baseStyles.colors.lightblue;
          break;
        case 3:
          return baseStyles.colors.lightGrey;
          break;
        default:
          return baseStyles.colors.lightblue
      }
    }

    renderRow(rowData) {
        return (
            <AccountItem
            rowData={rowData}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        overview: state.overview
    };
}

export default connect(mapStateToProps)(OverviewView);
