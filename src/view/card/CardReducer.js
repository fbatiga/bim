"use strict";

import { handleActions } from 'redux-actions';
import { CARD_MOVE_STARTED, CARD_MOVE_ENDED, CARD_SET_CARDS} from './CardAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
	moving : false,
	list : []
};


const CardReducer = handleActions({

	[CARD_MOVE_STARTED]: (state, action) => {
        return { ...state, moving: true};
    },

    [CARD_MOVE_ENDED]: (state, action) => {
        return { ...state, moving: false};
    },

    [CARD_SET_CARDS]: (state, action) => {

    	let cards = [];

    	for( var i in action.cards){
    		cards.push(action.cards[i])
    	}

        return { ...state, list: cards};
    },

}, initialState);

export default CardReducer;
