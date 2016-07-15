"use strict";

import { handleActions } from 'redux-actions';
import {
    LAUNCH_REQUEST, LAUNCH_SUCCESS, LAUNCH_FAILURE
} from './LaunchConstant';
import {Actions} from 'react-native-router-flux';

const initialState = {
   start: false
};


const LaunchReducer = handleActions({

    [LAUNCH_REQUEST]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },

    [LAUNCH_SUCCESS]: (state, action) => {
        return { ...state, loading: false, start: action.result};
    },

    [LAUNCH_FAILURE]: (state, action) => {
    	console.error(action.error.stack);
        return { ...state, loading: false, start: false, loginError: action.error };
    }

}, initialState);

export default LaunchReducer;
