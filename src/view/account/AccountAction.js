"use strict";

export const ACCOUNT_INIT = 'account.init';
export const ACCOUNT_REQUEST = 'account.request';
export const ACCOUNT_SUCCESS = 'account.success';
export const ACCOUNT_FAILURE = 'account.failure';


export function init(action) {
  return {
  	    type: ACCOUNT_INIT
  };
}
