"use strict";

export const MENU_SWIPE = 'menu.swipe';

export function swipeTo(ref) {
  return {
  	    type: MENU_SWIPE,
  	    ref
  };
}
