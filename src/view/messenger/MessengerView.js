'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet } from 'react-native';
import {getReply, addMessage, addSlackMessage,loadButtons} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import MessengerStyle from './MessengerStyle';
import {firebaseDb} from  '../../app/AppFirebase';

class MessengerView extends Component {

	constructor(props){
		super(props);

		const rootRef = firebaseDb.ref();
		this.firebaseMessagesRef = rootRef.child('alice/slack');
	}

	componentDidMount(){
		this.props.dispatch(getReply({
			msg : 'hello',
			session : this.props.session
		}));

		this.listenForItems(this.firebaseMessagesRef);
	}

	onSend(text) {
		this.props.dispatch(loadButtons([]));
		this.props.dispatch(addMessage(text));
		this.props.dispatch(getReply({
			msg : text,
			session : this.props.session
		}));

	}

	setButtons(buttons) {
		this.props.dispatch(loadButtons(buttons));
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
			setButtons={this.setButtons.bind(this)}
			messages={this.props.messages}  />
			<MessengerBottom
			onLayout={this.onBottomLayout}
			style={MessengerStyle.bottom}
			buttons={this.props.buttons}
			onPress={this.onSend.bind(this)} />
			</View>
			);
	}
}


function mapStateToProps(state) {
	return {
		messages : state.messenger.messages,
		session : state.messenger.session,
		buttons : state.messenger.buttons
	};
}

export default connect(mapStateToProps)(MessengerView);
