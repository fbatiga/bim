'use strict'
import React, { Component } from 'react';
import { View, Text, StatusBar,  StyleSheet, TouchableOpacity , Image, Animated} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import asset from '../asset';
import {connect} from 'react-redux';
import {loadSession} from '../view/login/LoginAction';
import {setVisibility} from '../view/messenger/MessengerAction';
import { Actions } from 'react-native-router-flux';


const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch"
	},
	button :{
		position: 'absolute',
		top: 30,
		right: -10
	},
	bot :{
		borderRadius:30,
		width:60,
		height:60
	},
})



class AppLayout extends Component {

	componentDidMount(){
		this.props.dispatch(loadSession());
	}

	constructor(props){
		super(props);
		this.state = {
			index : 1,
			bounceValue: new Animated.Value(0.0001),
		};
	}

	gotTo(item){
		this.props.dispatch(setVisibility(false));
		this.refs.swiper.scrollBy(1);
		item.action();
	}

	home(){

		if(this.props.messenger.visibility == false){
			Actions.messenger();
		}

		if(this.state.index == 1){
			if(this.props.messenger.visibility == true){
				this.refs.swiper.scrollBy(-1);
			}
		}

		if(this.state.index == 0){
			this.refs.swiper.scrollBy(1);
		}


	}


	_onMomentumScrollEnd(e, state, context) {

		this.setState({
			index : context.state.index
		});

	}

	componentDidUpdate(prevProps, prevState) {

		if(prevProps.messenger.visibility == null ){

			if( this.state.index == 0 ){

				Animated.timing(
					this.state.bounceValue,
					{
						duration: 300,
						toValue: 1,
						friction: 8,
						tension: 100
					}).start();

			}else if( this.state.index == 1 ){

				Animated.timing(
					this.state.bounceValue,
					{
						duration: 300,
						toValue: 0.0001,
						friction: 8,
						tension: 100
					}).start();

			}

		}else if( prevProps.messenger.visibility !== this.props.messenger.visibility ){

			var sequence = [];

			if(prevProps.messenger.visibility != null ){
				sequence.push(
					Animated.timing(
						this.state.bounceValue,
						{
							duration: 300,
							toValue: 0.0001,
							friction: 8,
							tension: 100
						})
					);
			}

			if( this.props.messenger.visibility != null ){
				sequence.push(
					Animated.timing(
						this.state.bounceValue,
						{
							duration: 300,
							toValue: 1,
							friction: 8,
							tension: 100
						})
					);
			}

			if(sequence.length > 0){
				Animated.sequence(sequence).start();
			}


		}

	}

	render() {

		let imageAnimation = { transform: [ {scale: this.state.bounceValue}] };

		let image = asset.bot;

		if(this.props.messenger.visibility == true  && this.state.index == 1) {
			image = asset.close;
		}

		if(this.props.login.session != false ){
			return (
				<View>
				<StatusBar hidden={true} />
				<Swiper
				loop={false}
				onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)}
				ref='swiper'
				scrollEnabled={!this.props.card.moving}
				horizontal={!this.props.card.moving}
				showsPagination={false}
				index={1}>
				<MenuView gotTo={this.gotTo.bind(this)} />
				<View style={styles.viewContainer} >
				{this.props.children}
				</View>
				</Swiper>
				<TouchableOpacity style={styles.button}  onPress={this.home.bind(this)}>
				<Animated.Image source={image} style={[styles.bot, imageAnimation ]} />
				</TouchableOpacity>
				</View>);

		}else{

			return (
				<View style={styles.viewContainer} >
				{this.props.children}
				</View>
				);
		}
	}
}


function mapStateToProps(state) {
	return {
		card : state.card,
		messenger: state.messenger,
		login: state.login
	};
}

export default connect(mapStateToProps)(AppLayout);
