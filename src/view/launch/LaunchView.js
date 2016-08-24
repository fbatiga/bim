'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
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
				<View contentContainerStyle={[LaunchStyle.container]}>
					<Image source={asset.launch}  style={{width:width, height: height}} resizeMode='cover' >
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
