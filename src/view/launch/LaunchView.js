'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LaunchStyle from './LaunchStyle';

import {connect} from 'react-redux';
import {loadSession} from './LaunchAction';
import {loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';


class LaunchView extends Component {

	componentDidMount() {
		this.props.dispatch(loadSession());
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.launch.start){

			let result = nextProps.launch.start;

			this.props.dispatch(registerSession(result.session));

			Actions.messenger();
		}

	}

	render(){

		return (
			<View style={LaunchStyle.container}>
			<View style={LaunchStyle.top} >
				<Image source={require("../../asset/logo.png")} />
			</View>
			<View style={LaunchStyle.bottom} >
			<Text style={LaunchStyle.loading}>Chargement...</Text>
			</View>
			</View>
			);
	}
}

function mapStateToProps(state) {
	return {
		launch : state.launch
	};
}

export default connect(mapStateToProps)(LaunchView);
