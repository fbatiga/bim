"use strict";

import { handleActions } from 'redux-actions';
import { JOURNAL_REQUEST, JOURNAL_SUCCESS, JOURNAL_FAILURE } from './JournalAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const JournalReducer = handleActions({

	[JOURNAL_REQUEST]: (state, action) => {
		return Object.assign({}, state, {loading: true});
	}
}, initialState);

export default JournalReducer;
