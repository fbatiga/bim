"use strict";

export const OVERVIEW_INIT = 'overview.init';
export const OVERVIEW_OPEN = 'overview.open';
export const OVERVIEW_SET_ACCOUNTS = 'overview.setAccounts';


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

export function setAccounts(accounts) {
  return {
    type: OVERVIEW_SET_ACCOUNTS,
    accounts
  }
};
