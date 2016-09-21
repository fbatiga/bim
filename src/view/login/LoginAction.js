"use strict";

export const LOGIN_CONNECT = 'login.connect';
export const LOGIN_SIGNUP = 'login.sign_up';


export function login(username) {
  return {
    type: LOGIN_CONNECT,
    username
  };
}


export function logout(username) {
  return {
    type: LOGIN_CONNECT,
    username
  };
}

export function signup() {
  return {
    type: LOGIN_SIGNUP
  };
}




