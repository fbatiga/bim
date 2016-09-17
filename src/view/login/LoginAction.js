"use strict";

export const LOGIN_CONNECT = 'login.connect';
export const LOGIN_SIGNUP = 'login.sign_up';
export const LOGIN_REGISTER = 'login.register';


export function login(username) {
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


export function register(username) {
  return {
    type: LOGIN_REGISTER,
    username
  };
}


