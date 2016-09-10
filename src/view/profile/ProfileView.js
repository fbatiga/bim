'use strict';

import React, { Component } from 'react';
import { View, Text, Image,  StyleSheet, ScrollView, PanResponder} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewWithBackground from '../../component/ViewWithBackground';
import Swiper from 'react-native-swiper';
import BackButton from '../../component/BackButton';
import AppAsset from '../../app/AppAsset';

import {connect} from 'react-redux';
import {init} from './ProfileAction';


class ProfileView extends Component {


	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease:this.handlePanResponderRelease.bind(this)
		});
	}

	componentDidMount() {
		this.scroll = this.refs.swiper.getScrollResponder();
		this.position = 0;
	}


	handlePanResponderRelease(evt, gestureState) {
		let distance = gestureState.moveY- gestureState.y0;
		if(distance >0){
			if(this.position ==  this.pointPosition ){
				this.scrollTo(0);
			}else if(this.position ==  this.trophyPosition ){
				this.scrollTo(this.pointPosition);
			}
		}else{
			if(this.position ==  0){
				this.scrollTo(this.pointPosition);
			}else if(this.position ==  this.pointPosition ){
				this.scrollTo(this.trophyPosition);
			}
		}
	}

	scrollTo(y){
		this.scroll.scrollTo({
			y: y,
			x: 0
		});
		this.position = y;
	}

	onPointLayout(event){
		this.pointPosition = event.nativeEvent.layout.y;
	}

	onTrophyLayout(event){
		this.trophyPosition = event.nativeEvent.layout.y;
	}

	render() {
		return (
			<View style={style.container}>
			<ScrollView
				ref='swiper'
				horizontal={false}
				{...this._panResponder.panHandlers}
				scrollEnabled={false}
				bounces={false}
				>

				<BackButton image={AppAsset.back} back={this.props.back} />

				<View style={style.row}>
				<Image source={asset.alice}/>
				</View>
				<View style={style.content}>
				<Text style={style.name}>Alice</Text>
				<Text style={style.name}>Holzman</Text>
				<View style={style.line}>
				<Text style={style.address}>13 rue de Berne, 75008 PARIS</Text>
				</View>
				<View style={style.row}>
				<View style={style.action}>
				<Image source={asset.modify} />
				<Text style={style.param}> MODIFIER MES PARAMÈTRES</Text>
				</View>
				</View>

				</View>
				<Image onLayout={this.onPointLayout.bind(this)} source={asset.point}/>
				<Image onLayout={this.onTrophyLayout.bind(this)} source={asset.trophy}/>
				</ScrollView>
				</View>)
	}

}


const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'column',
	},
	content :{
		padding:30
	},
	name : {
		fontFamily : 'Montserrat-Bold',
		fontSize: 36,
		lineHeight : 36,
		marginTop:2,
		marginBottom:2,
		color : '#120037'
	},
	address : {
		fontFamily : 'Montserrat-Light',
		fontSize: 14,
		color : '#120037',
		marginTop:25,
		marginBottom:25,
	},
	line: {
		flex : 1,
		borderBottomWidth: 1,
		borderColor: '#ECECED',
	},
	row : {
		flexDirection: 'row',
		alignItems : 'center',
		justifyContent : 'center',	},
		action : {
			flexDirection: 'row',
			alignItems : 'flex-start',
			marginTop:20,
			marginBottom:20,

		},
		param : {
			flex : 1,
			lineHeight : 20,
			fontFamily : 'Montserrat-UltraLight',
			fontSize: 10,
			color : '#120037',
		}
	});

const asset = {
	alice: require('./asset/alice.png'),
	trophy : require('./asset/trophy.png'),
	point : require('./asset/point.png'),
	modify : require('./asset/modify.png'),
}

function mapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connect(mapStateToProps)(ProfileView);
