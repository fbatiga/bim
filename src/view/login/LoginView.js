'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions , TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LoginStyle from './LoginStyle';
import {connect} from 'react-redux';
import {loadSession} from './LoginAction';
import asset from '../../asset';
import {loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';


const {width, height} = Dimensions.get('window');

class LoginView extends Component {

	componentDidMount() {
		this.props.dispatch(loadSession());
		this.session = null;
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.login.start){
			this.session = nextProps.login.start.session;
		}

	}


	login(){
		this.props.dispatch(registerSession(this.session));
		Actions.messenger();
	}

	render(){

		return (
				<TouchableOpacity style={[LoginStyle.container, { width:width, height: height}]} onPress={this.login.bind(this)} >
					<Image source={asset.login}  style={{width:width, height: height}} resizeMode='contain' ></Image>
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
