'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet , TextInput} from 'react-native';
import {getReply, addMessage, addSlackMessage,loadButtons,restartBot , notify, setVisibility} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import MessengerStyle from './MessengerStyle';
import {firebaseDb} from  '../../app/AppFirebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';


class MessengerView extends Component {

	constructor(props){
		super(props);

		const rootRef = firebaseDb.ref();
		this.firebaseMessagesRef = rootRef.child('alice/slack');
		this.firebaseNotificationRef = rootRef.child('alice/notification');
		this.state = {
			input : false
		};
	}

	componentDidMount(){

		this.props.dispatch(setVisibility(true));
		//console.log('componentDidMount',  this.props.messenger);

		if(this.props.messenger.messages.length == 0){

			this.props.dispatch(getReply({
				msg : 'hello',
				session : this.props.messenger.session
			}));

			this.firebaseNotificationRef.on('value', function(snapshot) {

				let notification = snapshot.val();
					//console.log('firebaseNotificationRef', notification , this.props.messenger.notification);
					if(notification !== null  && this.props.messenger.notification === false){
						this.props.dispatch(notify(notification));
					}

					this.firebaseNotificationRef.set(null);

				}.bind(this));
		}else{
			this.props.messenger.messages.map((message)=>{
				message.loaded = true;
			})
		}

	}

	componentWillUnmount(){
		this.props.dispatch(setVisibility(false));
	}


	componentWillReceiveProps(nextProps){
		//console.log('componentWillReceiveProps', this.props.messenger, nextProps.messenger);

		if(this.props.messenger.notification != nextProps.messenger.notification  && nextProps.messenger.notification != false){

			this.firebaseMessagesRef.on("child_added", function(snapshot) {
				let message = snapshot.val();
				//console.log('child_added ', message);

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

		//console.log('firebaseMessagesRef',this.props.messenger.bot, nextProps.messenger.bot );
		if(this.props.messenger.bot !== nextProps.messenger.bot  && nextProps.messenger.bot == true){
			this.firebaseMessagesRef.off();

			this.props.dispatch(getReply({
				msg : 'hello',
				session : this.props.messenger.session
			}));

		}
	}


	componentDidUpdate(){

		//console.log('componentDidUpdate',this.props.messenger)

		if(this.props.messenger.bot == true  && this.props.messenger.messages.length == 0){


		}

	}

	onSend(text) {

		if (this.state.input== false  && text == '...') {
			this.setState({
				input: true
			});
		}else if(this.state.input == true){
			this.props.dispatch(notify(text));

		}else {
			this.props.dispatch(loadButtons([]));
			this.props.dispatch(addMessage(text));

			if(this.props.messenger.bot == true){
				this.props.dispatch(getReply({
					msg : text,
					session : this.props.messenger.session
				}));
			}
		}

	}




	onLayout(){
		this.props.dispatch(setVisibility(true));
	}

	setButtons(buttons) {
		this.props.dispatch(loadButtons(buttons));
	}


	render(){
		return (

			<View style={MessengerStyle.container} onLayout={this.onLayout.bind(this)}>
			<View style={ { height: 20} } />
			<MessengerMain
			style={MessengerStyle.main}
			setButtons={this.setButtons.bind(this)}
			messages={this.props.messenger.messages}  />

			{this.state.input && (<View>
				<View  style={{flexDirection:'row', backgroundColor: '#F0F3F5', alignitems: 'center', justifyContent: 'center'}}>

				<TextInput
				autoCapitalize='sentences'
				autoCorrect={false}
				autoFocus={true}
				ref="textInput"
				style= {{borderRadius: 10, margin:10,  flex: 1, padding:2, backgroundColor:'white', height:30}}
				/>
				<Text style={{color:'#B8A4E6', fontFamily : 'Montserrat-SemiBold',
		letterSpacing: 3, margin:5 , lineHeight: 30, }}>ENVOYER</Text>
				</View>
				<KeyboardSpacer/>

				</View>)}
			{!this.state.input && (<MessengerBottom
				style={MessengerStyle.bottom}
				onLayout={this.onBottomLayout}
				buttons={this.props.messenger.buttons}
				onPress={this.onSend.bind(this)} />)}


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
