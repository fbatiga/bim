"use strict";

import { handleActions } from 'redux-actions';
import { MENU_SWIPE, MENU_LOCATION } from './MenuAction';

const initialState = {
	goTo : 'main',
	location : 'main'
};


const MenuReducer = handleActions({

    [MENU_SWIPE]: (state, action) => {
        return {...state, goTo : action.goTo };
    },

    [MENU_LOCATION]: (state, action) => {
        return {...state, location : action.location };
    },
}, initialState);

export default MenuReducer;
