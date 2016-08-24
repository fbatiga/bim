'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import asset from '../asset';
import {connect} from 'react-redux';
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


	constructor(props){
		super(props);
		this.state = {
			messenger : true,
			index : 1
		};
	}

	gotTo(item){
		this.setState({
			messenger : false
		});
		item.action();
		this.refs.swiper.scrollBy(1);
	}

	home(){

		console.log('home', this.state);
		if(this.state.index == 1 &&  this.state.messenger == true){
			this.refs.swiper.scrollBy(-1);
		}else{
			Actions.messenger();
			if(this.state.index == 0){
				this.refs.swiper.scrollBy(1);
			}

			if(this.state.messenger == false){
				this.setState({
					messenger : true
				});
			}
		}

	}


 	_onMomentumScrollEnd(e, state, context) {

	    this.setState({
			index : context.state.index
		});
	 }

	render() {
		return (
			<View>
			<Swiper
			loop={false}
			onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)}
			ref='swiper'
			showsPagination={false}
			index={1}>
			<MenuView gotTo={this.gotTo.bind(this)}/>
			<Swiper
			horizontal={false}
			loop={false}
			showsPagination={false}
			index={1}>
			<View style={styles.viewContainer} >
			{this.props.children}
			</View>
			</Swiper>
			</Swiper>
			<TouchableOpacity style={styles.button}  onPress={this.home.bind(this)}>
			{ this.props.launch.start && (this.state.messenger == false  || this.state.index== 0 ) && <Image source={asset.bot}  style={styles.bot}  /> }
			{ this.props.launch.start && (this.state.messenger == true && this.state.index== 1 ) &&  <Image source={asset.close}  style={styles.bot}  /> }
			</TouchableOpacity>
			</View>)
	}
}


function mapStateToProps(state) {
	return {
		messenger: state.messenger,
		launch : state.launch
	};
}

export default connect(mapStateToProps)(AppLayout);


