'use strict';

import React, { Component } from 'react';
import { View, Text, Image,  StyleSheet, ScrollView, PanResponder, Dimensions, Animated, Easing, AsyncStorage, TouchableOpacity,BackAndroid} from 'react-native';
import { Actions } from 'react-native-router-flux';
import BackButton from '../common/button/BackButton';
import AppAsset from '../../app/AppAsset';
import {swipeTo, configureSwipe} from '../menu/MenuAction';
import {login, signup} from '../login/LoginAction';
import {setVisibility, logout, loadSession} from '../messenger/MessengerAction';


import {connect} from 'react-redux';
const height = Dimensions.get('window').height;


class ProfileView extends Component {



	constructor(props) {
		super(props);

		this.state = {
			fadeAnim: new Animated.Value(0),
			pointHeight : 0,
			animPictureValue: new Animated.Value(-200),
			animContentValue: new Animated.Value(height)
		};
	}


	// componentWillReceiveProps(nextProps) {

	// 	this.animeView();
	// }

	componentDidMount() {

		this.scroll = this.refs.profileSwiper.getScrollResponder();
		this.position = 0;
		this.animeView();

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
		this.pointPosition = event.nativeEvent.layout.y ;

		this.setState({
			pointHeight: event.nativeEvent.layout.height
		})

		console.log('onPointLayout',this.pointPosition);
	}

	onTrophyLayout(event){
		this.trophyPosition = event.nativeEvent.layout.y ;
		console.log('onTrophyLayout',this.trophyPosition);
	}

	goToMenu(){
		this.props.dispatch(swipeTo('menu'));
	}

	animeView(){

		let backAfter=	Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1,
				delay : 200,
				duration : 300
			});

		let picAfter =	Animated.timing(
			this.state.animPictureValue,
			{
				toValue: 0,
				delay : 300,
				duration: 300,
				easing : Easing.ease
			});

		let formAfter=	Animated.timing(
			this.state.animContentValue,
			{
				toValue: 30,
				duration: 300,
				easing : Easing.ease
			});

		Animated.parallel([ formAfter, picAfter, backAfter]).start();

	}

	configureScroll(){
		this.props.dispatch(
			configureSwipe({
				onVerticalSwipe : this.onHorizontalSwipe.bind(this),
				onVerticalLargeSwipe : this.onHorizontalSwipe.bind(this)
			})
			);

	}


	logout(){
		AsyncStorage.clear();
		alert('Vous avez été déconnecté');
		this.props.dispatch(setVisibility(true));
		this.props.dispatch(logout());
		this.props.dispatch(loadSession('welcome'));


	}


	onHorizontalSwipe(distance) {
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

	render() {
		return (
			<View style={style.container} onLayout={this.configureScroll.bind(this)}>
			<ScrollView
			ref='profileSwiper'
			horizontal={false}
			scrollEnabled={false}
			>
			<View style={{height: height - this.state.pointHeight}} >
				<View style={style.row}>
					<BackButton image={AppAsset.back} back={this.goToMenu.bind(this)} style={{ opacity : this.state.fadeAnim}} />
					<Animated.Image source={asset.alice} style={{top : this.state.animPictureValue}}/>
				</View>
				<Animated.View style={{top : this.state.animContentValue}} >
					<View style={style.content} >
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
						<View style={style.row}>
							<TouchableOpacity onPress={this.logout.bind(this)} >
								<View style={style.action}>
									<Text style={style.param}> DECONNEXION </Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
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
		padding:30,
		justifyContent: 'flex-start',
		flexDirection: 'column'

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
