"use strict";

import { handleActions } from 'redux-actions';
import { CONTACT_LOAD } from './ContactAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
	list : [],
	loading : true
};


const ContactReducer = handleActions({

	[CONTACT_LOAD]: (state, action) => {

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
	},

}, initialState);

export default ContactReducer;
