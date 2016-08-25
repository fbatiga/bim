"use strict";

import { handleActions } from 'redux-actions';
import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from './ProfileAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const ProfileReducer = handleActions({

	[PROFILE_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	},

	[PROFILE_SUCCESS]: (state, action) => {
		return { ...state, loading: false, start: action.result};
	},

	[PROFILE_FAILURE]: (state, action) => {
		console.error(action.error.stack);
		return { ...state, loading: false, start: false, loginError: action.error };
	}

}, initialState);

export default ProfileReducer;
