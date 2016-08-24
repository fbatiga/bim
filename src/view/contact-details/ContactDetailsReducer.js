"use strict";

import { handleActions } from 'redux-actions';
import { CONTACTDETAILS_REQUEST, CONTACTDETAILS_SUCCESS, CONTACTDETAILS_FAILURE } from './ContactDetailsAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const ContactDetailsReducer = handleActions({

	[CONTACTDETAILS_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[CONTACTDETAILS_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[CONTACTDETAILS_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default ContactDetailsReducer;
