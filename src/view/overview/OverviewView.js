'use strict';

import React, { Component } from 'react';
import { View, Text,ListView, Image, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { ScrollableTabBar }  from 'react-native-scrollable-tab-view';
import asset from '../../app/AppAsset';
import AppGuideline from '../../app/AppGuideline';
import Title from '../common/title/Title';

import {connect} from 'react-redux';

class OverviewView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filterIndex: 0,
			currentTab: 'all',
			currentMonth: 'JUIN',
			bounceValue: new Animated.Value(1),
			fadeAnim: new Animated.Value(1),
			showAccount : false
		};
	}

	render() {
		return (
			<View
			horizontal={false} style={[style.container, {flex: 1}]}>
			<View style={[style.top, {flex: 1}]}>

			<Title style={{opacity: this.state.fadeAnim, marginBottom: 70}}>COMPTES</Title>

			<Animated.View style={[style.circle, {transform: [{scale: this.state.bounceValue}]}]}>
			<ScrollableTabView
			style={{marginTop: 20,  borderBottomWidth: 0}}
			initialPage={0}
			tabBarPosition={'bottom'}
			tabBarUnderlineColor={'transparent'}
			tabBarActiveTextColor={'white'}
			tabBarInactiveTextColor={AppGuideline.colors.lightviolet}
			renderTabBar={() => <ScrollableTabBar style={style.tabs} tabsContainerStyle={style.tabBar} />}
			>
			{this.props.overview.accounts.map((value, key) => {
				return (
					<View tabLabel={value.label} key={key}>
					<TouchableOpacity style={style.graph} onPress={()=> {
						if (value.type == 'internal') {
							this.transition(value.type);
						}
					}}>
					<View style={[style.graphCircle, {backgroundColor: this.selectColor(value.type, key)}]}>
					<Animated.Text style={[style.graphLabel, {opacity: this.state.fadeAnim}]} >SOLDE ACTUEL</Animated.Text>
					<Animated.Text style={[style.graphBalance, {opacity: this.state.fadeAnim}]} >{value.balance} €</Animated.Text>
					</View>
					</TouchableOpacity>
					</View>
					);
			})}
			</ScrollableTabView>
			</Animated.View>
			</View>

			<View style={style.addIcon}>
			<TouchableOpacity style={style.graph} onPress={Actions.addAccount}>
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

	randomizeColor(index) {
		switch ( index % 3 ) {
			case 0: return AppGuideline.colors.white; break;
			case 1: return AppGuideline.colors.pink; break;
			case 2: return AppGuideline.colors.lightblue; break;
			case 3: return AppGuideline.colors.lightGrey; break;
			default: return AppGuideline.colors.lightblue
		}
	}

	selectColor(type, key) {
		if (type === 'internal') {
			return AppGuideline.colors.alternative;
		} else {
			return this.randomizeColor(key);
		}
	}

	transition(type) {

		let animations = [];


		animations.push(
			Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 0,
				duration: 50
			}),
			Animated.timing(
			this.state.bounceValue, {
				duration: 300,
				toValue: 15,
			})
		);


		Animated.sequence(animations).start(()=>{
			if (type === 'jackpot') {
				Actions.jackpot();
			} else {
				Actions.account();
			}
		})

	}
}


const style = StyleSheet.create({
	circle: {
		backgroundColor: 'transparent',
	},
	container: {
		backgroundColor:  AppGuideline.colors.deepBlue,
	},
	top: {
		alignItems: 'stretch',
		backgroundColor: AppGuideline.colors.deepBlue,
		top: 0,
		left: 0,
	},
	tabs: {
		overflow: 'hidden',
		height: 150,
		borderWidth: 0
	},
	tabBar: {
		marginTop : 50,
		borderWidth: 0,
		paddingLeft : 160
	},
	graph: {
		alignItems: 'center'
	},
	graphCircle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 200,
		padding: 10,
		marginBottom: 10,
		// backgroundColor:  AppGuideline.colors.alternative,
		borderRadius: 145
	},
	graphLabel: {
		fontSize: 10,
		letterSpacing : 1.5,
		fontFamily: 'Montserrat',
		color: AppGuideline.colors.deepBlue,
		fontWeight: '300',
		marginBottom: 5,
		overflow: 'hidden',
		textAlign: "center"
	},
	graphBalance: {
		fontSize: 36,
		color: AppGuideline.colors.deepBlue,
		fontWeight: 'bold'
	},
	addIcon: {
		alignItems: 'flex-end',
		marginRight: -15,
		marginBottom: 15
	}

});


function mapStateToProps(state) {
	return {
		overview: state.overview
	};
}

export default connect(mapStateToProps)(OverviewView);
