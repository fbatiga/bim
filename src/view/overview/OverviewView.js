'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { ScrollableTabBar }  from 'react-native-scrollable-tab-view';
import moment from 'moment';

import OverviewStyle from './OverviewStyle';
import {init} from './OverviewAction';
import asset from '../../asset';
import baseStyles from '../../styles/vars.js';
import Title from '../../component/Title.js';

import {connect} from 'react-redux';

var custom = {
    circle: {
        backgroundColor: 'transparent',
        // height: 10,
        // width: 10,
        // position: 'absolute',
        // top: 50,
        // left: 0,
        // right: 0,
        // justifyContent: 'center'
    }
}

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
            dataSource: ds.cloneWithRows(this.props.overview.accounts),
            bounceValue: new Animated.Value(1),
            fadeAnim: new Animated.Value(1)
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
            horizontal={false} style={[OverviewStyle.container, {flex: 1}]}>
                <View style={[OverviewStyle.top, {flex: 1}]}>
                    <Animated.Text style={[baseStyles.titles.h1, {opacity: this.state.fadeAnim}]}>Comptes</Animated.Text>

                    {/* <Animated.View style={[custom.circle, { transform: [ {scale: this.state.bounceValue} ] }]} /> */}
                    <Animated.View style={[custom.circle, {transform: [{scale: this.state.bounceValue}]}]}>
                        <ScrollableTabView
                        style={{marginTop: 20}}
                        initialPage={0}
                        tabBarPosition={'bottom'}
                        tabBarUnderlineColor={'transparent'}
                        tabBarActiveTextColor={'white'}
                        tabBarInactiveTextColor={baseStyles.colors.lightviolet}
                        renderTabBar={() => <ScrollableTabBar style={{borderBottomWidth: 0}}/>}
                        >
                             {this.props.overview.accounts.map((value, key) => {
                                 return (
                                     <View tabLabel={value.label} key={key}>
                                         <TouchableOpacity style={OverviewStyle.graph} onPress={()=> {
                                             if (value.type == 'internal') {
                                                 this.transition(value.type);
                                             }
                                         }}>
                                             <View style={[OverviewStyle.graphCircle, {backgroundColor: this.selectColor(value.type)}]}>
                                                 <Animated.Text style={[OverviewStyle.graphLabel, {opacity: this.state.fadeAnim}]} >SOLDE ACTUEL</Animated.Text>
                                                 <Animated.Text style={[OverviewStyle.graphBalance, {opacity: this.state.fadeAnim}]} >{value.balance} €</Animated.Text>
                                             </View>
                                         </TouchableOpacity>
                                     </View>
                                 );
                             })}
                        </ScrollableTabView>
                    </Animated.View>
                </View>

                <View style={OverviewStyle.addIcon}>
                    <TouchableOpacity style={OverviewStyle.graph} onPress={()=> {
                        Actions.addAccount()
                    }}>
                        <Animated.Image source={asset.add} style={{
                            width: 70,
                            height: 70,
                            opacity: this.state.fadeAnim
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

    selectColor(type) {
        if (type === 'internal') {
            return baseStyles.colors.alternative;
        } else {
            return this.randomizeColor();
        }
    }

    transition(type) {
        var custom = {
            circle: {
                backgroundColor: baseStyles.colors.alternative,
                borderRadius: 145
            }
        }

        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 50
            }
        ).start();

        Animated.timing(
            this.state.bounceValue,
            {
                duration: 300,
                toValue: 8,
                friction: 5,
                tension: 40
            }
        ).start();

        setTimeout(() => {
            if (type === 'jackpot') {
                Actions.jackpot();
            } else {
                Actions.account();
            }
        }, 300);
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
