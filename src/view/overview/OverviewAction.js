"use strict";

export const OVERVIEW_INIT = 'overview.init';
export const OVERVIEW_OPEN = 'overview.open';


export function init(action) {
  return {
  	    type: OVERVIEW_INIT
  };
}

export function openAccount(action) {
    return {
        type: OVERVIEW_OPEN
    };
}



