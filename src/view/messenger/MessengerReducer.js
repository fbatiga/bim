"use strict";

import { handleActions } from 'redux-actions';
import {
	MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE, MESSENGER_CHOICE, MESSENGER_MESSAGE, MESSENGER_BOT_MESSAGE, MESSENGER_SESSION
} from './MessengerAction';

const initialState = {
	session : null,
	messages: [],
	choices : []
};

function createBotMessage(text){

	return {
		text,
		position: 'left',
		date: new Date()
	};

}

function createMessage(text){

	return {
		text,
		position: 'right',
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
				choices.push({
					text : option.substr(0, pos)
				});
			}
		});

	}else{
		result.map((text) =>{
			choices.push({
				text
			});
		});
	}


	return choices;

}

function addMessage(messages, result, isBot){

	if(isBot == undefined ){
	 	let isBot = result.indexOf('@:') == 0;
		if(isBot){
			result = result.substr(2);
		}
	}


	if(result.indexOf('[') != -1 || isBot ){

		result = result.split('[')[0];

		return messages.concat(createBotMessage(result));

	}else{
		return messages.concat(createMessage(result));
	}

}

function loadMessage(messages, result){

	return  messages.concat(createMessage(result));

}

const MessengerReducer = handleActions({

	[MESSENGER_CHOICE]: (state, action) => {
		return { ...state, choices: loadChoices(action.params)};
	},

	[MESSENGER_SESSION]: (state, action) => {
		return { ...state, session: action.params};
	},

	[MESSENGER_MESSAGE]: (state, action) => {
		return { ...state, messages: addMessage(state.messages, action.params, false) };
	},

	[MESSENGER_BOT_MESSAGE]: (state, action) => {
		let newState = { ...state, messages: addMessage(state.messages, action.params, true) };
		let choices = loadChoices(action.params);
		if ( choices.length > 0 ) {
			newState.choices = choices;
		}

		return newState;

	},

	[MESSENGER_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[MESSENGER_SUCCESS]: (state, action) => {
		let choices = loadChoices(action.result.botResponse);
		let newState =	{ ...state, loading: false, messages: addMessage(state.messages, action.result.botResponse)};

		if ( choices.length > 0 ) {
			newState.choices = choices;
		}

		return newState;
	},

	[MESSENGER_FAILURE]: (state, action) => {
		return { ...state, loading: false, loginError: action.error };
	}

}, initialState);

export default MessengerReducer;
