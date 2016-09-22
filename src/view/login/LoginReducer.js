"use strict";

import {AsyncStorage} from 'react-native';
import { handleActions } from 'redux-actions';
import {
  LOGIN_CONNECT, LOGIN_SIGNUP, LOGIN_DEVICE
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

    [LOGIN_SIGNUP]: (state, action) => {
        return {...state, username : null};
    },

}, initialState);

export default LoginReducer;
