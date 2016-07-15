"use strict";

import {
    MESSENGER_REQUEST, MESSENGER_SUCCESS, MESSENGER_FAILURE, MESSENGER_CHOICE, MESSENGER_MESSAGE, MESSENGER_BOT_MESSAGE
} from './MessengerConstant';

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
