"use strict";

export const CONTACT_SET = 'contact.set';

export const CONTACT_LOADING = 'contact.loading';


export function setContacts(contacts) {
  return {
  	    type: CONTACT_SET,
  	    contacts
  };
}


export function loadContacts(contacts) {
  return {
  	    type: CONTACT_LOADING
  };
}
