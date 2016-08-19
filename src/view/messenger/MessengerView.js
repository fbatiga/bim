'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet } from 'react-native';
import {getReply, addMessage, addSlackMessage,loadButtons,restartBot , notify} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import MessengerStyle from './MessengerStyle';
import {firebaseDb} from  '../../app/AppFirebase';

class MessengerView extends Component {

	constructor(props){
		super(props);

		const rootRef = firebaseDb.ref();
		this.firebaseMessagesRef = rootRef.child('alice/slack');
		this.firebaseNotificationRef = rootRef.child('alice/notification');
	}

	componentDidMount(){

		this.props.dispatch(getReply({
			msg : 'hello',
			session : this.props.messenger.session
		}));

		this.firebaseNotificationRef.on('value', function(snapshot) {

			let notification = snapshot.val();
			console.log('firebaseNotificationRef', notification , this.props.messenger.notification);
			if(notification !== null  && this.props.messenger.notification === false){
				this.props.dispatch(notify(notification));
			}

			this.firebaseNotificationRef.set(null);

		}.bind(this));
	}


	componentWillReceiveProps(nextProps){

		console.log('componentWillReceiveProps',this.props.messenger.notification, nextProps.messenger.notification);

		if(this.props.messenger.notification != nextProps.messenger.notification  && nextProps.messenger.notification != false){

			this.firebaseMessagesRef.on("child_added", function(snapshot) {
				let message = snapshot.val();
				console.log('child_added ', message);

				if(message.user !== undefined && message.user != 'slackbot' && message.text !== 'fin'){
					this.props.dispatch(addSlackMessage(message.text));
				}else{
					this.props.dispatch(restartBot());
				}

				this.firebaseMessagesRef.child(snapshot.key).remove();

			}.bind(this));
		}

		if(this.props.messenger.notification != nextProps.messenger.notification  && nextProps.messenger.notification == false){
			this.props.dispatch(restartBot());
		}

		if(this.props.messenger.bot != nextProps.messenger.bot  && nextProps.messenger.bot == true){
			this.firebaseMessagesRef.off();

			this.props.dispatch(getReply({
				msg : 'hello',
				session : this.props.messenger.session
			}));
		}
	}

	onSend(text) {
		this.props.dispatch(loadButtons([]));
		this.props.dispatch(addMessage(text));

		if(this.props.messenger.bot == true){
			this.props.dispatch(getReply({
				msg : text,
				session : this.props.messenger.session
			}));
		}
	}

	setButtons(buttons) {
		this.props.dispatch(loadButtons(buttons));
	}

	render(){
		return (
			<View style={MessengerStyle.container}>
			<View style={ { height: 20 } } />
			<MessengerMain
			style={MessengerStyle.main}
			setButtons={this.setButtons.bind(this)}
			messages={this.props.messenger.messages}  />
			<MessengerBottom
			onLayout={this.onBottomLayout}
			style={MessengerStyle.bottom}
			buttons={this.props.messenger.buttons}
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
