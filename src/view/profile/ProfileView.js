'use strict';

import React, { Component } from 'react';
import { View, Text, Image,  StyleSheet, ScrollView, PanResponder} from 'react-native';
import { Actions } from 'react-native-router-flux';
import BackButton from '../common/item/button/BackButton';
import AppAsset from '../../app/AppAsset';
import {swipeTo, configureSwipe} from '../menu/MenuAction';

import {connect} from 'react-redux';


class ProfileView extends Component {


	onHorizontalSwipe(distance) {
		console.log('onHorizontalSwipe', distance);
		if(distance >0){
			if(this.position ==  0){
				this.scrollTo(this.pointPosition);
			}else if(this.position ==  this.pointPosition ){
				this.scrollTo(this.trophyPosition);
			}
		}else{
			if(this.position ==  this.pointPosition ){
				this.scrollTo(0);
			}else if(this.position ==  this.trophyPosition ){
				this.scrollTo(this.pointPosition);
			}
		}
		return true;
	}

	componentDidMount() {
		this.scroll = this.refs.profileSwiper.getScrollResponder();
		this.position = 0;
	}

	scrollTo(y){
		this.scroll.scrollTo({
			y: y,
			x: 0,
			animated : true
		});
		this.position = y;
	}

	onPointLayout(event){
		this.pointPosition = event.nativeEvent.layout.y;
		console.log('onPointLayout',this.pointPosition);
	}

	onTrophyLayout(event){
		this.trophyPosition = event.nativeEvent.layout.y;
		console.log('onTrophyLayout',this.trophyPosition);
	}

	goToMenu(){
		this.props.dispatch(swipeTo('menu'));
	}

	configureScroll(){
		this.props.dispatch(
			configureSwipe({
				onVerticalSwipe : this.onHorizontalSwipe.bind(this),
				onVerticalLargeSwipe : this.onHorizontalSwipe.bind(this)
			})
		);
	}

	render() {
		return (
			<View style={style.container} onLayout={this.configureScroll.bind(this)}>
			<ScrollView
			ref='profileSwiper'
			horizontal={false}
			scrollEnabled={false}
			>

			<View style={style.row}>

			<BackButton image={AppAsset.back} back={this.goToMenu.bind(this)} />

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
		flexDirection: 'column'
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
		flex: 1,
		flexDirection: 'row',
		alignItems : 'center',
		justifyContent : 'center'
	},
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
