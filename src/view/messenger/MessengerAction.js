"use strict";

export const MESSENGER_REQUEST = 'messenger.request';
export const MESSENGER_SUCCESS = 'messenger.success';
export const MESSENGER_FAILURE = 'messenger.failure';
export const MESSENGER_BUTTONS = 'messenger.buttons';
export const MESSENGER_MESSAGE = 'messenger.message';
export const MESSENGER_BOT_MESSAGE = 'messenger.bot_message';
export const MESSENGER_SESSION = 'messenger.session';
export const MESSENGER_SLACK_MESSAGE = 'messenger.slack';
export const MESSENGER_BOT_RESTART = 'messenger.bot_start';
export const MESSENGER_NOTIFICATION = 'messenger.notification';

export function getReply(params) {
  return {
    types: [MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE],
    motion: '/messageBot',
    params : params
  };
}

export function loadButtons(params) {
  return {
    type: MESSENGER_BUTTONS,
    params : params
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
    params : params
  };
}

export function registerSession(params) {
  return {
    type: MESSENGER_SESSION,
    params : params
  };
}

export function addBotMessage(params) {
  return {
    type: MESSENGER_BOT_MESSAGE,
    params : params
  };
}


export function addSlackMessage(params) {
  return {
    type: MESSENGER_SLACK_MESSAGE,
    params : params
  };
}

export function addMessage(params) {
  return {
    type: MESSENGER_MESSAGE,
    params : params
  };
}
