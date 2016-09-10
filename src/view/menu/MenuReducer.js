"use strict";

import { handleActions } from 'redux-actions';
import { MENU_SWIPE } from './MenuAction';

const initialState = {
	ref : 'main'
};


const MenuReducer = handleActions({

    [MENU_SWIPE]: (state, action) => {
        return {...state, ref : action.ref };
    },

}, initialState);

export default MenuReducer;
