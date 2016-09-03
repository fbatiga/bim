'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet , ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {getReply, addMessage, addSlackMessage,loadButtons,restartBot , notify, setVisibility} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import {firebaseDb} from  '../../app/AppFirebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const style = StyleSheet.create({
	bottom : {
		flex : 4,
		backgroundColor : '#79F0CC',
		flexDirection:'column',
	},
	main: {
		flex : 6,
		backgroundColor : '#FFFFFF',
		padding : 15
	},
	container: {
		flex: 1,
		flexDirection : 'column',
		backgroundColor: '#FFFFFF',
	},
	send : {
		color:'#B8A4E6',
		fontFamily : 'Montserrat-SemiBold',
		letterSpacing: 3,
		margin:5 ,
		lineHeight: 30,
	},
	input : {
		borderRadius: 10,
		margin:10,
		flex: 1,
		padding:4,
		backgroundColor:'white',
		height:35
	},
	text : {
		flexDirection:'row',
		backgroundColor: '#F0F3F5',
		alignItems: 'flex-start',
		justifyContent: 'center'
	}
});


class MessengerView extends Component {

	constructor(props){
		super(props);

		const rootRef = firebaseDb.ref();
		this.firebaseMessagesRef = rootRef.child('alice/slack');
		this.firebaseNotificationRef = rootRef.child('alice/notification');
		this.state = {
			input : false,
			text : ''
		};
	}

	componentDidMount(){

		//this.props.dispatch(setVisibility(true));
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

	// componentWillUpdate(nextProps, nextState){

	// 	if(this.props.messenger.notification != nextProps.messenger.notification  && nextProps.messenger.notification == false){
	// 		this.props.dispatch(restartBot());
	// 	}


	// }


	componentDidUpdate(){

		//console.log('componentDidUpdate',this.props.messenger)

		if(this.props.messenger.bot == true  && this.props.messenger.messages.length == 0){


		}

	}


	onSend(text) {

		console.log('onSend', arguments);

		if (this.state.input== false  && text == '...') {
			this.setState({
				input: true
			});
		}else if(this.state.input == true){

			this.props.dispatch(addMessage(this.state.text));
			this.setState({text : ''});

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

	onChangeText(text){
		this.setState({text});
	}

	setButtons(buttons) {
		this.props.dispatch(loadButtons(buttons));
	}


	onLayout(){

		if(this.props.messenger.visibility != null){
			this.props.dispatch(setVisibility(true));
		}
	}

	render(){

		return (

			<View style={style.container} onLayout={this.onLayout.bind(this)}>
			<View style={ { height: 20} } />
			<MessengerMain
			style={style.main}
			setButtons={this.setButtons.bind(this)}
			messages={this.props.messenger.messages}  />


			{this.state.input &&
				(
					<View>
					<View  style={style.text}>
					<TextInput
					autoCapitalize='sentences'
					autoCorrect={false}
					ref="textInput"
					value={this.state.text}
					autoFocus={true}
					returnKeyType='send'
					placeholder='Entrez votre message...'
					onChangeText={this.onChangeText.bind(this)}
					onSubmitEditing={(event)=>{this.onSend(event.nativeEvent.text);}}
					style={style.input}
					/>
					</View>
					<KeyboardSpacer/>
					</View>
					)}
				{!this.state.input &&
					(<MessengerBottom
						style={style.bottom}
						onLayout={this.onBottomLayout}
						buttons={this.props.messenger.buttons}
						onPress={this.onSend.bind(this)} />
						)}

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
