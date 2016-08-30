'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions , TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadSession} from './LoginAction';
import asset from '../../asset';
import {loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';


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

class LoginView extends Component {

	login(){
		this.props.dispatch(registerSession(this.props.login.session));
		Actions.messenger();
	}

	render(){

		return (
				<TouchableOpacity style={[LoginStyle.container, { alignItems:'center', justifyContent: 'flex-start', flexDirection:'column' }]} onPress={this.login.bind(this)} >
					<View style={{flex: 4}} >
						<Image source={asset.login.logo}  style={{ width:width-80, top: 40}} resizeMode='contain'></Image>
					</View>
					<View style={{flex: 1}} >
						<Image source={asset.login.fingerPrint}  style={{ width:41.95 }} resizeMode='contain'></Image>
					</View>
				</TouchableOpacity>
		);
	}
}

function mapStateToProps(state) {
	return {
		login : state.login
	};
}

export default connect(mapStateToProps)(LoginView);
