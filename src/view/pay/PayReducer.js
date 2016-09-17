"use strict";

import { handleActions } from 'redux-actions';
import { PAY_REQUEST, PAY_SUCCESS, PAY_FAILURE } from './TransferAction';
import { Actions } from 'react-native-router-flux';
import Contacts  from 'react-native-contacts';


const initialState = {
};



const TransferReducer = handleActions({

	[PAY_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[PAY_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[PAY_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default TransferReducer;
