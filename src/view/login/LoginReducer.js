"use strict";

import {AsyncStorage} from 'react-native';
import { handleActions } from 'redux-actions';
import {
  LOGIN_CONNECT, LOGIN_SIGNUP, LOGIN_REGISTER
} from './LoginAction';
import {Actions} from 'react-native-router-flux';

const initialState = {
   loading : false,
   username : false,
   profile : {

   }
};

const LoginReducer = handleActions({


    [LOGIN_CONNECT]: (state, action) => {

        return {...state, username : action.username };
    },

	[LOGIN_REGISTER]: (state, action) => {
		let username = action.username.toLowerCase();
		AsyncStorage.setItem('@AsyncStorage:username', username);
        return {...state, username };
    },

    [LOGIN_SIGNUP]: (state, action) => {
        return {...state, username : false};
    },

}, initialState);

export default LoginReducer;
