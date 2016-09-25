"use strict";

export const CARD_INIT = 'card.init';
export const CARD_MOVE_STARTED = 'card.move_started';
export const CARD_MOVE_ENDED = 'card.move_ended';
export const CARD_SET_CARDS = 'card.set_Cards';

export function init(action) {
  return {
  	    type: CARD_INIT
  };
}

export function setCards(cards) {
  return {
  	    type: CARD_SET_CARDS,
  	    cards
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
