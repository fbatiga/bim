"use strict";

import {ListView} from 'react-native';
import { handleActions } from 'redux-actions';
import { CONTACT_LOADING, CONTACT_SET } from './ContactAction';
import { Actions } from 'react-native-router-flux';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const dsBim = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});




let actions = [{
	type : 'action',
	text : 'Payer avec un QR Code'
}];


let defaultContacts = [{
	givenName: 'Alice',
	familyName: 'Holzman',
	"adresse" : "13 rue de Berne, 75008 PARIS",
	"image" : "/alice.png",
	"imageUrl" : "http://test.png",
	"username" : "alice",
	phoneNumbers: [{number: "0667505355"}],
	type:'bim'
},{
	givenName: 'Jérôme',
	familyName: 'Toucheboeuf',
	"adresse" : "3 avenue des Ternes, 75017 PARIS",
	"image" : "/jerome.png",
	"imageUrl" : "http://test.png",
	"username" : "jerome",
	phoneNumbers: [{number: "0667505356"}],
	type:'bim'
},{
	givenName: 'Philippe',
	familyName: 'Mihelic',
	"adresse" : "21 rue de Cléry, 75002 PARIS",
	"image" : "/philippe.png",
	"imageUrl" : "http://test.png",
	"username" : "philippe",
	phoneNumbers: [{number: "0667505355"}],
	type:'bim'
},{
	givenName: 'Héloïse',
	familyName: 'Beldico',
	"adresse" : "15 rue du Terrage, 75010 PARIS",
	"image" : "/heloise.png",
	"imageUrl" : "http://test.png",
	"username" : "heloise",
	phoneNumbers: [{number: "0667505354"}],
	type:'bim'
},{
	givenName: 'Nathalie',
	familyName: 'Collin',
	"adresse" : "2 rue Mercoeur, 75011 PARIS",
	"image" : "/nathalie.png",
	"imageUrl" : "http://test.png",
	"username" : "nathalie",
	phoneNumbers: [{number: "0667505353"}],
	type:'bim'
},{
	"givenName" : "Rémy",
	"familyName" : "Weber",
	"adresse" : "118 rue de Javel, 75015 PARIS",
	"image" : "/remy.png",
	"imageUrl" : "http://remy.png",
	"username" : "remy",
	phoneNumbers: [{number: "0667505353"}],
	type:'bim'
}];


const initialState = {
	list : [],
	dataSource : ds,
	bim : {
		dataSource: dsBim.cloneWithRows(actions.concat(defaultContacts)),
		list : actions.concat(defaultContacts)
	},
	loading : false
};



const ContactReducer = handleActions({

	[CONTACT_LOADING]: (state, action) => {
		return { ...state,  loading : true };
	},

	[CONTACT_SET]: (state, action) => {

		let contacts= defaultContacts.concat(action.contacts);

		contacts = contacts.sort((a,b) => {
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
