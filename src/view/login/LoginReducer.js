"use strict";

import {AsyncStorage} from 'react-native';
import { handleActions } from 'redux-actions';
import {
  LOGIN_CONNECT, LOGIN_SIGNUP, LOGIN_DEVICE, LOGIN_LOGOUT
} from './LoginAction';
import {Actions} from 'react-native-router-flux';

const initialState = {
   loading : false,
   username : false,
   device : null
};

const LoginReducer = handleActions({


    [LOGIN_CONNECT]: (state, action) => {
        return {...state, username : action.username };
    },

    [LOGIN_DEVICE]: (state, action) => {
        return {...state, device : action.device};
    },

	[LOGIN_LOGOUT]: (state, action) => {
        return {...state, username : null};
    },

    [LOGIN_SIGNUP]: (state, action) => {
        return {...state, username : null};
    },

}, initialState);

export default LoginReducer;
