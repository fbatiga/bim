'use strict'
import React, { Component } from 'react';
import { Navigator, Text,  AppState, Platform } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {addSlackMessage} from '../view/messenger/MessengerAction';

import LaunchView from '../view/launch/LaunchView';
import MessengerView from '../view/messenger/MessengerView';
import OverviewView from '../view/overview/OverviewView.js';
import AccountView from '../view/account/AccountView';
import CardView from '../view/card/CardView';
import ContactView from '../view/contact/ContactView';
import TransferView from '../view/transfer/TransferView';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {firebaseDb} from  './AppFirebase';

const pendingNotifications = [];

//const firebaseRef = firebaseDb.ref('alice/device');


const scenes = Actions.create(
	<Scene key="root" hideNavBar={true}>
	<Scene key="launch" component={LaunchView} initial={true}  title="Launch"/>
	<Scene key="messenger" component={MessengerView} title="messenger"/>
	<Scene key="overview" component={OverviewView} title="overview"/>
	<Scene key="account" component={AccountView} title="account"/>
	<Scene key="card" component={CardView}  title="card"/>
	<Scene key="contact" component={ContactView} title="contact"/>
	<Scene key="transfer" component={TransferView} title="transfer"/>
	</Scene>
	);

class AppNavigator extends Component {

	constructor(props) {
		super(props);
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
	}

	handleNotification (message, data, isActive) {
			var notification = {message: message, data: data, isActive: isActive};
			console.log('handleNotification', notification);
			this.props.dispatch(addSlackMessage(message));
	}

	componentDidMount() {

		OneSignal.configure({
			onNotificationOpened: this.handleNotification.bind(this)
		});

		AppState.addEventListener('change', this.handleAppStateChange);

		OneSignal.sendTags( { user: 'alice' });
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange(appState) {

		console.log('handleAppStateChange', appState);
		if (appState === 'background') {

			// if (Platform.OS === 'ios') {
			// 	date = date.toISOString();
			// }

			// PushNotification.localNotificationSchedule({
			// 	message: "My Notification Message",
			// 	date,
			// });
		}
	}

	render() {
		return <Router scenes={scenes} />
	}

}

function mapStateToProps(state) {
	return {
		messenger : state.messenger
	};
}

export default connect(mapStateToProps)(AppNavigator);

