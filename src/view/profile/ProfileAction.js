"use strict";

export const PROFILE_INIT = 'profile.init';
export const PROFILE_REQUEST = 'profile.request';
export const PROFILE_SUCCESS = 'profile.success';
export const PROFILE_FAILURE = 'profile.failure';


export function init(action) {
  return {
  	    type: PROFILE_INIT
  };
}
