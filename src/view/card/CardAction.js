"use strict";

export const CARD_INIT = 'card.init';
export const CARD_REQUEST = 'card.request';
export const CARD_SUCCESS = 'card.success';
export const CARD_FAILURE = 'card.failure';

export function init(action) {
  return {
  	    type: CARD_INIT
  };
}
