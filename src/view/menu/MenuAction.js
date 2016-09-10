"use strict";

export const MENU_SWIPE = 'menu.swipe';
export const MENU_LOCATION = 'menu.location';


export function swipeTo(goTo) {
  return {
  	    type: MENU_SWIPE,
  	    goTo
  };
}


export function goTo(location) {
  return {
  	    type: MENU_LOCATION,
  	    location
  };
}
