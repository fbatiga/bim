"use strict";

import {ListView} from 'react-native';
import { handleActions } from 'redux-actions';
import { CONTACT_LOADING, CONTACT_SET } from './ContactAction';
import { Actions } from 'react-native-router-flux';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


const initialState = {
	list : [],
	dataSource : ds,
	loading : false
};


let actions = [{
	type : 'action',
	text : 'Payer avec un QR Code'
}];

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


		contacts= actions.concat(contacts);

		return { ...state, list: contacts, dataSource: ds.cloneWithRows(contacts), loading : false };
	}

}, initialState);

export default ContactReducer;
