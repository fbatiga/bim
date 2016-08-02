"use strict";

export const MESSENGER_REQUEST = 'messenger.request';
export const MESSENGER_SUCCESS = 'messenger.success';
export const MESSENGER_FAILURE = 'messenger.failure';
export const MESSENGER_CHOICE = 'messenger.choice';
export const MESSENGER_MESSAGE = 'messenger.message';
export const MESSENGER_BOT_MESSAGE = 'messenger.bot_message';
export const MESSENGER_SESSION = 'messenger.session';

export function getReply(params) {
  return {
    types: [MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE],
    motion: '/messageBot',
    params : params
  };
}


export function loadChoices(params) {
  return {
    type: MESSENGER_CHOICE,
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

export function addMessage(params) {
  return {
    type: MESSENGER_MESSAGE,
    params : params
  };
}
