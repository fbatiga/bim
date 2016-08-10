"use strict";


export const LAUNCH_REQUEST = 'launch.request';
export const LAUNCH_SUCCESS = 'launch.success';
export const LAUNCH_FAILURE = 'launch.failure';

export function loadSession(action) {
  return {
    types: [LAUNCH_REQUEST, LAUNCH_SUCCESS, LAUNCH_FAILURE],
    motion: '/messageBot',
    params : {
    	session : 'alice'+Math.random(),
    	msg : 'hello'
    }
  };
}
