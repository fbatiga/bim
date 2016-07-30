"use strict";

import { handleActions } from 'redux-actions';
import { TRANSFER_REQUEST, TRANSFER_SUCCESS, TRANSFER_FAILURE } from './TransferConstant';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const TransferReducer = handleActions({

	[TRANSFER_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[TRANSFER_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[TRANSFER_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default TransferReducer;
