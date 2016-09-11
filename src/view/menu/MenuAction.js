"use strict";

export const MENU_SWIPE = 'menu.swipe';
export const MENU_LOCATION = 'menu.location';
export const MENU_CONFIGURE = 'menu.configure';



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



export function configureSwipe(gesture) {
  return {
  	    type: MENU_CONFIGURE,
  	    gesture
  };
}
