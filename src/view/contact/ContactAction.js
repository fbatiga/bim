"use strict";

export const CONTACT_INIT = 'contact.init';
export const CONTACT_REQUEST = 'contact.request';
export const CONTACT_SUCCESS = 'contact.success';
export const CONTACT_FAILURE = 'contact.failure';


export function init(action) {
  return {
  	    type: CONTACT_INIT
  };
}
