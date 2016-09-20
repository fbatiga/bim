'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions , TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {login, signup} from './LoginAction';
import AppAsset from '../../app/AppAsset';
import {loadSession, updateProfile, loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';
import {firebaseDb} from  '../../app/AppFirebase';

const LoginStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor : '#79F0CC',
	},
	bottom : {
		flex: 3,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: 'center',
	},
	top: {
		flex: 4,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center"
	}
});

const {width, height} = Dimensions.get('window');
const rootRef = firebaseDb.ref();

class LoginView extends Component {

	login(){
		if(this.props.login.username == false){
			this.props.dispatch(loadSession('welcome'));
		}else{
			this.firebaseProfileRef = rootRef.child(this.props.login.username+'/profile');

			this.firebaseProfileRef.on('value', function(snapshot) {
				this.props.dispatch(updateProfile(snapshot.val()));
				this.props.dispatch(loadSession('hello'));
			}.bind(this));
		}
	}

	componentWillMount(){

		//AsyncStorage.clear();

		var value =  AsyncStorage.getItem('@AsyncStorage:username', (err, result) =>{

			if(err){
				console.log(err);
			}

			if (result !== null){
				this.props.dispatch(login(result));
			}else{
				this.props.dispatch(signup());
			}

		});

	}

	render(){

		return (
			<TouchableOpacity style={[LoginStyle.container, { alignItems:'center', justifyContent: 'flex-start', flexDirection:'column' }]} onPress={this.login.bind(this)} >
			<View style={{flex: 4}} >
			<Image source={asset.logo}  style={{ width:width-80, top: 40}} resizeMode='contain'></Image>
			</View>
			<View style={{flex: 1}} >
			<Image source={asset.fingerPrint}  style={{ width:41.95 }} resizeMode='contain'></Image>
			</View>
			</TouchableOpacity>
			);
	}
}


const asset = {
	logo: require('./asset/logo.png'),
	fingerPrint : require('./asset/fingerprint.gif')
};

function mapStateToProps(state) {
	return {
		login : state.login
	};
}

export default connect(mapStateToProps)(LoginView);
