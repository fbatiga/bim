"use strict";

import { handleActions } from 'redux-actions';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from './LoginAction';
import {Actions} from 'react-native-router-flux';

const initialState = {
   session: false,
   loading : false
};

const LoginReducer = handleActions({

    [LOGIN_REQUEST]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },

    [LOGIN_SUCCESS]: (state, action) => {
        return { ...state, loading: false, session: action.result.session};
    },

    [LOGIN_FAILURE]: (state, action) => {
    	console.error(action.error.stack);
        return { ...state, loading: false, session: false, loginError: action.error };
    }

}, initialState);

export default LoginReducer;
