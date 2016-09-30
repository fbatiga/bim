"use strict";

export const MESSENGER_REQUEST = 'messenger.request';
export const MESSENGER_SUCCESS = 'messenger.success';
export const MESSENGER_FAILURE = 'messenger.failure';
export const MESSENGER_BUTTONS = 'messenger.buttons';
export const MESSENGER_MESSAGE = 'messenger.message';
export const MESSENGER_BOT_MESSAGE = 'messenger.bot_message';
export const MESSENGER_SLACK_MESSAGE = 'messenger.slack';
export const MESSENGER_BOT_RESTART = 'messenger.bot_restart';
export const MESSENGER_BOT_STOP = 'messenger.bot_stop';
export const MESSENGER_NOTIFICATION = 'messenger.notification';
export const MESSENGER_VISIBILITY = 'messenger.visibility';
export const MESSENGER_PROFILE = 'messenger.profile';
export const MESSENGER_INIT = 'messenger.init';
export const MESSENGER_REGISTER = 'messenger.register';
export const MESSENGER_CLOSE = 'messenger.close';
export const MESSENGER_MESSAGES_TO_SEE = 'messenger.messageToSee';

export function getReply(params) {
	return {
		types: [MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE],
		motion: '/messageBot',
		params: params
	};
}

export function loadSession(message) {
	return getReply({
		session: 'bim_' + Math.random(),
		msg: message
	});
}

export function initMessenger(params) {
	return {
		type: MESSENGER_INIT
	};
}

export function setVisibility(params) {
	return {
		type: MESSENGER_VISIBILITY,
		params: params
	};
}


export function messagesToSee(count) {
	return {
		type: MESSENGER_MESSAGES_TO_SEE,
		count
	};
}

export function loadButtons(params) {
	return {
		type: MESSENGER_BUTTONS,
		params: params
	};
}

export function stopBot() {
	return {
		type: MESSENGER_BOT_STOP
	};
}

export function restartBot() {
	return {
		type: MESSENGER_BOT_RESTART
	};
}

export function notify(params) {
	return {
		type: MESSENGER_NOTIFICATION,
		params: params
	};
}

export function addBotMessage(params) {
	return {
		type: MESSENGER_BOT_MESSAGE,
		params: params
	};
}

export function updateProfile(profile) {
	return {
		type: MESSENGER_PROFILE,
		profile
	};
}

export function addSlackMessage(params) {
	return {
		type: MESSENGER_SLACK_MESSAGE,
		params: params
	};
}

export function addMessage(params) {
	return {
		type: MESSENGER_MESSAGE,
		params: params
	};
}

export function close(params) {
	return {
		type: MESSENGER_CLOSE
	};
}

export function register(username) {
	return {
		type: MESSENGER_REGISTER,
		username
	};
}
