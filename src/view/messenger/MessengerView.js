'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet , Image, ScrollView, TextInput, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import { register, getReply, updateProfile, loadSession, addMessage, addSlackMessage,loadButtons,restartBot , notify, setVisibility, close} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import {swipeTo} from '../menu/MenuAction';

import MessengerBottom from './layout/MessengerBottom';
import {firebaseDb} from  '../../app/AppFirebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AppAsset from '../../app/AppAsset';

const rootRef = firebaseDb.ref();

class MessengerView extends Component {

	constructor(props){
		super(props);

		this.buttons = [];
		this.state = {
			input : false,
			text : '',
			animBottomHeight : new Animated.Value(0)
		};

		this.form = [];

		this.firebaseMessagesRef = null;
		this.firebaseNotificationRef = null;
		this.firebaseProfileRef = null;

		this.inputToSave = null;
	}

	componentDidMount(){

		this.props.dispatch(swipeTo('menu'));

		if(this.props.messenger.messages.length > 0 ){

			this.props.messenger.messages.map((message)=>{
				message.loaded = true;
			})
		}

		Animated.timing(
			this.state.animBottomHeight,
			{
				toValue: 270,
				duration: 300
			}
			).start();

	}


	clearText() {
		if(this.props.login.username != false ){
			this.setState({
				input : false
			})
		}
	}

	onSend(text) {


		if(text == 'A plus tard !'){

			this.props.dispatch(close());

		}else if (this.state.input == false  && text == '...') {
			this.setState({
				input: true
			});
		}else {

			this.props.dispatch(addMessage(text));

			if(this.state.input == true){

				if(this.inputToSave !== null){

					let form = [];

					form[this.inputToSave] = text;

					if(this.inputToSave == 'prenom'){
						this.props.dispatch(register(text));
					}else{
						this.props.dispatch(updateProfile(form));
						rootRef.child(this.props.login.username+'/profile/'+this.inputToSave).set(text);
					}

					text = this.inputToSave;

				}

				this.setState({text : ''});

			}


			if(this.props.messenger.bot == true){

				this.props.dispatch(loadButtons([]));

				this.props.dispatch(getReply({
					msg : text,
					session : this.props.messenger.session
				}));
			}else{
				this.props.dispatch(loadButtons([]));
			}

		}

	}

	onChangeText(text){
		this.setState({text});
	}

	setButtons(buttons) {

		this.inputToSave = null;

		buttons.map((button, index)=>{

			if(button[0] == ':' ){

				this.inputToSave = button.substr(1);

				delete buttons[index];

				if(this.inputToSave == 'prenom'){
					return this.setState({
						input: true
					});
				}
			}

		});


		this.props.dispatch(loadButtons(buttons));

	}


	render(){

		return (

			<View style={[style.container, this.props.style]} >
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
					ref={(component) => {this._textInput = component}}
					autoFocus={true}
					returnKeyType='send'
					placeholder='Entrez votre message...'
					onSubmitEditing={(event)=>{this.onSend(event.nativeEvent.text);}}
					style={style.input}
					onBlur ={this.clearText.bind(this)}
					/>
					<TouchableOpacity  ref="next" style={style.close} onPress={this.clearText.bind(this)}>
					<Image  source={asset.close} />
					</TouchableOpacity>
					</View>

					<KeyboardSpacer/>
					</View>
					)}
				{!this.state.input &&
					(<MessengerBottom
						style={[style.bottom, {height : this.state.animBottomHeight }]}
						onLayout={this.onBottomLayout}
						buttons={this.props.messenger.buttons}
						onPress={this.onSend.bind(this)} />
						)}

					</View>



					);
	}
}



const style = StyleSheet.create({
	bottom : {
		backgroundColor : '#79F0CC',
		flexDirection:'column',
	},
	main: {
		flex : 2,
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
		borderWidth : 1,
		borderColor : '#DDE6EC',
		backgroundColor:'white',
		height:35
	},
	close : {
		padding:5,
		width :40
	},
	text : {
		flexDirection:'row',
		backgroundColor: '#F0F3F5',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const asset = {
	close:  require('./asset/close.png'),
};

function mapStateToProps(state) {
	return {
		messenger : state.messenger,
		login : state.login
	};
}

export default connect(mapStateToProps)(MessengerView);
