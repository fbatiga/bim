"use strict";

import { handleActions } from 'redux-actions';
import { CONTACT_LOADING, CONTACT_SET } from './ContactAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
	list : [],
	loading : false
};


let defaultContacts = [{
	givenName: 'Faouzane',
	familyName: 'BATIGA',
	phoneNumbers: [{number: "0667505353"}],
	type:'bim'
}];


const ContactReducer = handleActions({

	[CONTACT_LOADING]: (state, action) => {
		return { ...state,  loading : true };
	},

	[CONTACT_SET]: (state, action) => {

		contacts= defaultContacts.concat(contacts);

		let contacts = action.contacts.sort((a,b) => {
			if(a.givenName >  b.givenName){
				return 1;
			} else if (a.givenName ===  b.givenName){
				return 0;
			}
			else {
				return -1
			}
		});


		return { ...state, list: contacts, loading : false };
	}

}, initialState);

export default ContactReducer;
