"use strict";

import { handleActions } from 'redux-actions';
import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from './ContactConstant';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const ContactReducer = handleActions({

	[CONTACT_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[CONTACT_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[CONTACT_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default ContactReducer;
