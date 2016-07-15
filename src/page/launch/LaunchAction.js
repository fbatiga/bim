"use strict";

import {
    LAUNCH_REQUEST, LAUNCH_SUCCESS, LAUNCH_FAILURE
} from './LaunchConstant';

export function loadSession(action) {
  return {
    types: [LAUNCH_REQUEST, LAUNCH_SUCCESS, LAUNCH_FAILURE],
    motion: '/messageBot',
    params : {
    	session : Math.random(),
    	msg : 'hello'
    }
  };
}
