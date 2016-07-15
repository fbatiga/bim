'use strict';

import React, { Component } from 'react';
import { View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LaunchStyle from './LaunchStyle';

import {connect} from 'react-redux';
import {loadSession} from './LaunchAction';
import {loadChoices, addMessage, addBotMessage} from '../messenger/MessengerAction';


class LaunchPage extends Component {

	componentDidMount() {
		this.props.dispatch(loadSession());
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.launch.start){

			let result = nextProps.launch.start;

			this.session = result.session;

			if(result.cards && result.cards[0].buttons){

				let choices = [];
				result.cards[0].buttons.map((button) =>{
					choices.push(button.buttonText);
				});

				this.props.dispatch(loadChoices(choices));

			}

			if(result.botResponse){

				this.props.dispatch(addBotMessage(result.botResponse));
			}


			Actions.messenger();
		}

	}

	render(){
		return (
			<View style={LaunchStyle.container}>
			<Text>BIM Loading...</Text>
			</View>
			);
	}
}

function mapStateToProps(state) {
	return {
		launch : state.launch
	};
}

export default connect(mapStateToProps)(LaunchPage);
