"use strict";

import { handleActions } from 'redux-actions';
import { ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE } from './AccountConstant';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const AccountReducer = handleActions({

	[ACCOUNT_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[ACCOUNT_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[ACCOUNT_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default AccountReducer;
