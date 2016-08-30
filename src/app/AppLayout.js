'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
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
			index : 1
		};
	}

	gotTo(item){
		item.action();
		this.props.dispatch(setVisibility(false));
		this.refs.swiper.scrollBy(1);
	}

	home(){
		if(this.props.messenger.visibility == false){
			Actions.messenger();
		}

		if(this.state.index == 0){
			this.refs.swiper.scrollBy(1);
		}else 	if(this.state.index == 1 && this.props.messenger.visibility ==true){
			this.refs.swiper.scrollBy(-1);
		}

	}

	_onMomentumScrollEnd(e, state, context) {

		if(context.state.index == 1 && this.props.messenger.visibility == true){
			this.props.dispatch(setVisibility(true));
		}

		this.setState({
			index : context.state.index
		});
	}

	render() {

		if(this.props.login.session != false ){
			return (
				<View>
				<Swiper
				loop={false}
				onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)}
				ref='swiper'
				showsPagination={false}
				index={1}>
				<MenuView gotTo={this.gotTo.bind(this)}/>
				<View style={styles.viewContainer} >
				{this.props.children}
				</View>
				</Swiper>
				{ this.props.messenger.visibility != null &&
				(<TouchableOpacity style={styles.button}  onPress={this.home.bind(this)}>
					{(this.props.messenger.visibility == false || this.state.index == 0) && <Image source={asset.bot}  style={styles.bot}  /> }
					{(this.props.messenger.visibility == true  && this.state.index == 1) &&  <Image source={asset.close}  style={styles.bot}  /> }
					</TouchableOpacity>
				)}

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
		messenger: state.messenger,
		login: state.login
	};
}

export default connect(mapStateToProps)(AppLayout);
