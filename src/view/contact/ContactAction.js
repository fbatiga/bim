"use strict";

export const CONTACT_LOAD = 'contact.load';


export function loadContacts(contacts) {
  return {
  	    type: CONTACT_LOAD,
  	    contacts
  };
}
