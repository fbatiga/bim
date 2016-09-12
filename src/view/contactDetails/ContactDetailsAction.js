"use strict";

export const CONTACTDETAILS_INIT = 'contactdetails.init';
export const CONTACTDETAILS_REQUEST = 'contactdetails.request';
export const CONTACTDETAILS_SUCCESS = 'contactdetails.success';
export const CONTACTDETAILS_FAILURE = 'contactdetails.failure';


export function init(action) {
  return {
  	    type: CONTACTDETAILS_INIT
  };
}
