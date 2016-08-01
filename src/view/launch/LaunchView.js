'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LaunchStyle from './LaunchStyle';

import {connect} from 'react-redux';
import {loadSession} from './LaunchAction';
import asset from '../../asset';
import {loadChoices, registerSession, addMessage, addBotMessage} from '../messenger/MessengerAction';


class LaunchView extends Component {

	componentDidMount() {
		//this.props.dispatch(loadSession());
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.launch.start){

			let result = nextProps.launch.start;

			this.props.dispatch(registerSession(result.session));

			//Actions.messenger();
		}

	}

	render(){

		return (
				<View style={LaunchStyle.container}>
					<Image source={asset.login} style={LaunchStyle.background} resizeMode='stretch'>
						<View style={LaunchStyle.top} >
							<Image source={asset.logo} style={LaunchStyle.logo} />
						</View>
						<View style={LaunchStyle.bottom} >
							<Text style={LaunchStyle.loading}>Chargement...</Text>
						</View>
					</Image>
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
