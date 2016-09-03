"use strict";

export const CARD_INIT = 'card.init';
export const CARD_REQUEST = 'card.request';
export const CARD_SUCCESS = 'card.success';
export const CARD_FAILURE = 'card.failure';
export const CARD_MOVE_STARTED = 'card.move_started';
export const CARD_MOVE_ENDED = 'card.move_ended';

export function init(action) {
  return {
  	    type: CARD_INIT
  };
}

export function moveStarted() {
  return {
  	    type: CARD_MOVE_STARTED
  };
}

export function moveEnded(action) {
  return {
  	    type: CARD_MOVE_ENDED
  };
}
