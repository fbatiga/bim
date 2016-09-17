"use strict";

export const PAY_INIT = 'transfer.init';
export const PAY_REQUEST = 'transfer.request';
export const PAY_SUCCESS = 'transfer.success';
export const PAY_FAILURE = 'transfer.failure';


export function init(action) {
  return {
  	    type: PAY_INIT
  };
}
