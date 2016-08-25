"use strict";


export const LOGIN_REQUEST = 'login.request';
export const LOGIN_SUCCESS = 'login.success';
export const LOGIN_FAILURE = 'login.failure';

export function loadSession(action) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    motion: '/messageBot',
    params : {
    	session : 'alice'+Math.random(),
    	msg : 'hello'
    }
  };
}
