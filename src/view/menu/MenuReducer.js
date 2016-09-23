"use strict";

import { handleActions } from 'redux-actions';
import { MENU_SWIPE, MENU_LOCATION, MENU_CONFIGURE } from './MenuAction';

const initialState = {
	goTo : 'main',
	panResponder : null,
	gesture :{
		onRelease : ()=> {},
		onHorizontalSwipe : ()=> {},
		onVerticalSwipe : ()=> {},
		onSmallSwipe : ()=> {},
		onBigSwipe : ()=> {}
	}
};


const MenuReducer = handleActions({

	[MENU_SWIPE]: (state, action) => {
		return {...state, goTo : action.goTo };
	},

	[MENU_CONFIGURE]: (state, action) => {
		return {...state, gesture : action.gesture };
	},
}, initialState);


export default MenuReducer;
