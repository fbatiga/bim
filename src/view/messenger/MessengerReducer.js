"use strict";

import { handleActions } from 'redux-actions';

import { AsyncStorage } from 'react-native';
import {
	MESSENGER_REGISTER, MESSENGER_INIT, MESSENGER_PROFILE, MESSENGER_NOTIFICATION, MESSENGER_VISIBILITY, MESSENGER_BOT_RESTART, MESSENGER_SLACK_MESSAGE, MESSENGER_HELLO, MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE, MESSENGER_BUTTONS, MESSENGER_MESSAGE, MESSENGER_BOT_MESSAGE, MESSENGER_SESSION
} from './MessengerAction';

import SlackUser from '../../app/AppSlack';
import {firebaseDb} from  '../../app/AppFirebase';
const rootRef = firebaseDb.ref();



export let UserSlack = null;
export let BimSlack =  null;


const initialState = {
	session : null,
	messages: [],
	buttons : [],
	username : null,
	loading : false,
	notification : false,
	visibility : null,
	bot: true,
	profile : {}
};

function createMessage(text, image, buttons, isBot, index){
	return {
		text,
		image,
		buttons,
		index,
		visibility : false,
		position: isBot ? 'left':'right',
		date: new Date()
	};
}


function loadButtons(result){
	let buttons = [];

	result.split('[').map((option)=>{
		let pos = option.indexOf(']')
		if(pos != -1 ){
			buttons.push(option.substr(0, pos));
		}
	});

	console.log('loadButtons',buttons);

	return buttons;
}

function addMessages(state, result, isBot){

	let text = result.split('::next-2000::');
	let image = false;
	let messages = state.messages;
	let slackMessage = [];
	let slackButtons = [];

	console.log(isBot ? 'Bim : ' :'User : ');

	text.map((message, index)=>{
		let buttons = [];

		message = message.trim();

		let indexImage = message.indexOf('[img]');
		if(indexImage >= 0){
			image = message.substr(indexImage+5, message.indexOf('[/img]') - ( indexImage + 5 ) );
			message = message.replace( message.substr(indexImage, message.indexOf('[/img]')+ 6 ), '');

			console.log(image);
		}

		message.split('(').map((sentence)=>{
			let position = sentence.indexOf(')');
			if(position > 0){
				let word = sentence.substr(0,position);
				if(state.profile != null && state.profile[word] !== undefined){
					message = message.replace('('+word+')',state.profile[word]);
				}
			}
		})

		let choiceIndex  = message.indexOf('[')
		if( choiceIndex != -1 ){
			buttons = loadButtons(message.substr(choiceIndex));
			message =  message.substr(0, choiceIndex);
			slackButtons = slackButtons.concat(buttons);
		}

		if ( indexImage >= 0 || choiceIndex >= 0 || message != ''){
			messages = addMessage(messages, message, image, buttons, isBot, index);
			slackMessage.push(message);
		}

		image = false;

	});


	let newState = { ...state, messages };

	if(UserSlack != null ){
		if(isBot == true){
			if(slackButtons.length >0){
				BimSlack.question(slackMessage.join('\n'), slackButtons, image);
			}else{
				BimSlack.text(slackMessage.join('\n'), image);
			}
		}else{
			UserSlack.text(slackMessage.join('\n'), image);
		}
	}

	return newState;
}

function addMessage(messages, result, image, buttons, isBot, index){
	if(isBot == undefined ){
		let isBot = result.indexOf('@:') == 0;
		if(isBot){
			result = result.substr(2);
		}
	}

	return messages.concat(createMessage(result, image, buttons, isBot, index));
}

const MessengerReducer = handleActions({


    [MESSENGER_PROFILE]: (state, action) => {

    	let profile =  Object.assign({}, state.profile, action.profile);

    	console.log('profile =>', profile);

    	if(UserSlack == null && profile.prenom !== undefined && profile.username !== undefined && profile.webHookURL  !== undefined ){
    		UserSlack =  new  SlackUser('#bim_'+profile.username, profile.prenom, ':man:', false, profile.webHookURL);
			BimSlack =  new  SlackUser('#bim_'+profile.username, 'Bim', ':robot_face:', true, profile.webHookURL);
    	}

        return {...state, profile };
    },

	[MESSENGER_REGISTER]: (state, action) => {
		let username = action.username.toLowerCase();
		AsyncStorage.setItem('@AsyncStorage:username', username);
		rootRef.child(username+'/profile/prenom').set(action.username);
		rootRef.child(username+'/profile/username').set(username);

        return {...state, profile : { prenom : action.username, username } };
    },


	[MESSENGER_BUTTONS]: (state, action) => {
		console.log('MESSENGER_BUTTONS', action.params);
		return { ...state, buttons: action.params};
	},

	[MESSENGER_BOT_RESTART]: (state, action) => {
		return { ...state, bot: true, notification : false};
	},

	[MESSENGER_NOTIFICATION]: (state, action) => {
		return { ...state, bot: false, notification : state.visibility ? false : true, messages : [],  buttons:[]};
	},

	[MESSENGER_VISIBILITY]: (state, action) => {

		return { ...state, visibility : action.params, notification: action.params ? false : state.notification };
	},

	[MESSENGER_INIT]: (state, action) => {
		return { ...state, messages : [],  buttons:[]};
	},

	[MESSENGER_MESSAGE]: (state, action) => {
		return  addMessages(state, action.params, false);
	},

	[MESSENGER_BOT_MESSAGE]: (state, action) => {
		return  addMessages(state, action.result.botResponse, true);
	},

	[MESSENGER_SLACK_MESSAGE]: (state, action) => {
		return addMessages(state, action.params, true);
	},


	[MESSENGER_REQUEST]: (state, action) => {

		let newState = {...state, loading: true};

		if(state.session == null && action.params.session !== undefined){
			newState.session = action.params.session;
		}

		return newState;
	},

	[MESSENGER_SUCCESS]: (state, action) => {

		let newState = addMessages(state, action.result.botResponse, true);

		newState.loading = false;

		return newState;
	},

	[MESSENGER_FAILURE]: (state, action) => {
		return { ...state, loading: false, loginError: action.error };
	}

}, initialState);


export default MessengerReducer;
