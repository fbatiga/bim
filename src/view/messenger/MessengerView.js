'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet } from 'react-native';
import {getReply, addMessage, addSlackMessage} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import MessengerStyle from './MessengerStyle';
import AppConfig from  '../../app/AppConfig';

import * as firebase from 'firebase';
// Initialize Firebase
const firebaseApp = firebase.initializeApp(AppConfig.firebase);



class MessengerView extends Component {


	constructor(props){
		super(props);
		// Create a reference with .ref() instead of new Firebase(url)
		const rootRef = firebase.database().ref();
		this.firebaseMessagesRef = rootRef.child('alice/slack');
	}


	componentDidMount(){
		this.props.dispatch(getReply({
			msg : 'hello',
			session : this.props.messenger.session
		}));

		this.listenForItems(this.firebaseMessagesRef);

		this.messages = [];

	}

	onSend(text) {

		this.props.dispatch(addMessage(text));

		this.props.dispatch(getReply({
			msg : text,
			session : this.props.messenger.session
		}));

	}

	listenForItems(itemsRef) {


		itemsRef.on("child_added", function(snapshot) {
			let value = snapshot.val();
			if(value.user !== undefined && value.user != 'slackbot' ){
				this.props.dispatch(addSlackMessage(value.text));
				itemsRef.child(snapshot.key).remove();
			}
		}.bind(this));

	}

	render(){
		return (
			<View  style={MessengerStyle.container}>
			<View style={ { height: 20 } } />
			<MessengerMain
			style={MessengerStyle.main}
			messages={this.props.messenger.messages}  />
			<MessengerBottom
			onLayout={this.onBottomLayout}
			style={MessengerStyle.bottom}
			choices={this.props.messenger.choices}
			onPress={this.onSend.bind(this)} />
			</View>
			);
	}
}


function mapStateToProps(state) {
	return {
		messenger : state.messenger
	};
}

export default connect(mapStateToProps)(MessengerView);
