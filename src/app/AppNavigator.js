'use strict'
import React, { Component } from 'react';
import { Navigator, Text,  AppState, Platform } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import LaunchView from '../view/launch/LaunchView';
import MessengerView from '../view/messenger/MessengerView';
import AccountView from '../view/account/AccountView';
import CardView from '../view/card/CardView';
import ContactView from '../view/contact/ContactView';
import TransferView from '../view/transfer/TransferView';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

const pendingNotifications = [];



const scenes = Actions.create(
	<Scene key="root" hideNavBar={true}>
	<Scene key="launch" component={LaunchView} initial={true}  title="Launch"/>
	<Scene key="messenger" component={MessengerView} title="messenger"/>
	<Scene key="account" component={AccountView} title="account"/>
	<Scene key="card" component={CardView}  title="card"/>
	<Scene key="contact" component={ContactView} title="contact"/>
	<Scene key="transfer" component={TransferView} title="transfer"/>
	</Scene>
	);

export default class AppNavigator extends Component {

	constructor(props) {
		super(props);
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 5,
		};
	}

	handleNotification (notification) {

	}

	componentDidMount() {

		OneSignal.configure({
		    onIdsAvailable: function(device) {
		        console.log('UserId = ', device.userId);
		        console.log('PushToken = ', device.pushToken);
		    },
		  onNotificationOpened: function(message, data, isActive) {
		      var notification = {message: message, data: data, isActive: isActive};
		      console.log('handleNotification', notification);

		      //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
		      //    console.log('Navigator is null, adding notification to pending list...');

		  }.bind(this)
		});

		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange(appState) {
		if (appState === 'background') {
			let date = new Date(Date.now() + (this.state.seconds * 1000));

			if (Platform.OS === 'ios') {
				date = date.toISOString();
			}

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
