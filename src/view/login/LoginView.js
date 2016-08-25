'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions , TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LaunchStyle from './LaunchStyle';
import {connect} from 'react-redux';
import {loadSession} from './LaunchAction';
import asset from '../../asset';
import {loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';


const {width, height} = Dimensions.get('window');

class LaunchView extends Component {

	componentDidMount() {
		this.props.dispatch(loadSession());
		this.session = null;
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.launch.start){
			this.session = nextProps.launch.start.session;
		}

	}


	login(){
		this.props.dispatch(registerSession(this.session));
		Actions.messenger();
	}

	render(){

		return (
				<TouchableOpacity style={[LaunchStyle.container, { width:width, height: height}]} onPress={this.login.bind(this)} >
					<Image source={asset.launch}  style={{width:width, height: height}} resizeMode='contain' ></Image>
				</TouchableOpacity>
		);
	}
}

function mapStateToProps(state) {
	return {
		launch : state.launch
	};
}

export default connect(mapStateToProps)(LaunchView);
