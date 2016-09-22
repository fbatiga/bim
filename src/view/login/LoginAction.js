"use strict";

export const LOGIN_CONNECT = 'login.connect';
export const LOGIN_SIGNUP = 'login.sign_up';
export const LOGIN_DEVICE = 'login.device';


export function login(username) {
  return {
    type: LOGIN_CONNECT,
    username
  };
}


export function logout(device) {
  return {
    type: LOGIN_DEVICE,
    device
  };
}

export function device(device) {
  return {
    type: LOGIN_DEVICE,
    device
  };
}


export function signup() {
  return {
    type: LOGIN_SIGNUP
  };
}





