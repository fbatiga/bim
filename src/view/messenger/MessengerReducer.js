"use strict";

import { handleActions } from 'redux-actions';

import {
	MESSENGER_SLACK_MESSAGE, MESSENGER_HELLO, MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE, MESSENGER_CHOICE, MESSENGER_MESSAGE, MESSENGER_BOT_MESSAGE, MESSENGER_SESSION
} from './MessengerAction';

import { UserSlack, BimSlack } from '../../app/AppSlack';


const initialState = {
	session : null,
	messages: [],
	choices : []
};



function createMessage(text, image, isBot){
	return {
		text,
		image,
		position: isBot ? 'left':'right',
		date: new Date()
	};
}



function createChoice(result){

	if(result.cards && result.cards[0].buttons){

		let choices = [];

		result.cards[0].buttons.map((button) =>{
			choices.push({
				text: button.buttonText
			});
		});

		return choices;

	}else {
		return [];
	}
}

function loadChoices(result){
	let choices = [];

	if (typeof result ==  'string'){

		result.split('[').map((option)=>{
			let pos = option.indexOf(']')
			if(pos != -1 ){
				choices.push(option.substr(0, pos));
			}
		});

	}else{
		result.map((text) =>{
			choices.push(text);
		});
	}



	return choices;

}

function addMessages(state, result, isBot){

	let text = result.split('::next-2000::');
	let image = false;
	let choices = [];
	let messages = state.messages;
	let slackMessage = [];

	console.log(isBot ? 'Bim : ' :'User : ');

	text.map((message, index)=>{
		message = message.trim();
		console.log( message);

		let indexImage = message.indexOf('[img]');
		if(indexImage >= 0){
			image = message.substr(indexImage+5, message.indexOf('[/img]') - ( indexImage + 5 ) );
			message = message.replace( message.substr(indexImage, message.indexOf('[/img]')+ 6 ), '');
		}
		let choiceIndex  = message.indexOf('[')
		if( choiceIndex != -1 ){
			choices = loadChoices(message.substr(choiceIndex));
			message =  message.substr(0, choiceIndex);
		}
		if ( indexImage >= 0 || message != ''){
			messages = addMessage(messages, message, image, isBot, index);
			slackMessage.push(message);
		}

	});

	let newState = { ...state, messages };
	if ( choices.length > 0 ) {
		newState.choices = choices;
	}

	if(isBot == true){
			if(newState.choices.length >0){
				BimSlack.question(slackMessage.join('\n'), newState.choices, image);
			}else{
				BimSlack.text(slackMessage.join('\n'), image);
			}
	}else{
		UserSlack.text(slackMessage.join('\n'), image);
	}

	return newState;
}

function addMessage(messages, result, image,  isBot, index){
	if(isBot == undefined ){
		let isBot = result.indexOf('@:') == 0;
		if(isBot){
			result = result.substr(2);
		}
	}

	return messages.concat(createMessage(result, image, isBot));
}

const MessengerReducer = handleActions({


	[MESSENGER_CHOICE]: (state, action) => {
		return { ...state, choices: loadChoices(action.params)};
	},

	[MESSENGER_SESSION]: (state, action) => {
		return { ...state, session: action.params};
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
		return Object.assign({}, state, {loading: true});
	},

	[MESSENGER_SUCCESS]: (state, action) => {
		return addMessages(state, action.result.botResponse, true);
	},

	[MESSENGER_FAILURE]: (state, action) => {
		return { ...state, loading: false, loginError: action.error };
	}

}, initialState);

export default MessengerReducer;
