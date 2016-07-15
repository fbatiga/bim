"use strict";

import { handleActions } from 'redux-actions';
import {
	MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE, MESSENGER_CHOICE, MESSENGER_MESSAGE, MESSENGER_BOT_MESSAGE
} from './MessengerConstant';

const initialState = {
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
	result.map((text) =>{
		choices.push({
			text
		});
	});

	return choices;

}

function addBotMessage(messages, result){

	return  messages.concat(createBotMessage(result));

}


function addMessage(messages, result){

	return  messages.concat(createMessage(result));

}


function loadMessage(messages, result){

	return  messages.concat(createMessage(result));

}

const MessengerReducer = handleActions({

	[MESSENGER_CHOICE]: (state, action) => {
		return { ...state, choices: loadChoices(action.params)};
	},

	[MESSENGER_MESSAGE]: (state, action) => {
		return { ...state, messages: addMessage(state.messages, action.params) };
	},

	[MESSENGER_BOT_MESSAGE]: (state, action) => {
		return  { ...state, messages: addBotMessage(state.messages, action.params) };
	},

	[MESSENGER_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[MESSENGER_SUCCESS]: (state, action) => {
		return { ...state, loading: false, messages: addBotMessage(state.messages, action.result.botResponse)};
	},

	[MESSENGER_FAILURE]: (state, action) => {
		return { ...state, loading: false, loginError: action.error };
	}

}, initialState);

export default MessengerReducer;
