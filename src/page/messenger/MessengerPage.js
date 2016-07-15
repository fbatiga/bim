'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
	Linking,
	Platform,
	ActionSheetIOS,
	Dimensions,
	View,
	Text,
	Navigator,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import MessengerLayout from '../../layout/messenger/MessengerLayout';
import {loadChoices, getReply, addMessage} from './MessengerAction';

export default class MessengerPage extends Component {



	render() {
		return (
			<MessengerLayout
				loadChoices = {loadChoices}
				getReply = {getReply}
				addMessage = {addMessage}

			/>
			);
	}

}

function mapStateToProps(state) {
  return {
    messenger : state.messenger
  };
}

export default connect(mapStateToProps)(MessengerPage);
