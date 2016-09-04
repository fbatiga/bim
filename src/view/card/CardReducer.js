"use strict";

import { handleActions } from 'redux-actions';
import { CARD_REQUEST, CARD_SUCCESS, CARD_FAILURE, CARD_MOVE_STARTED, CARD_MOVE_ENDED} from './CardAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
	moving : false,
};


const CardReducer = handleActions({

	[CARD_MOVE_STARTED]: (state, action) => {
        return { ...state, moving: true};
    },
    [CARD_MOVE_ENDED]: (state, action) => {
        return { ...state, moving: false};
    },

    [CARD_REQUEST]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },

    [CARD_SUCCESS]: (state, action) => {
        return { ...state, loading: false, start: action.result};
    },

    [CARD_FAILURE]: (state, action) => {
    	console.error(action.error.stack);
        return { ...state, loading: false, start: false, loginError: action.error };
    }

}, initialState);

export default CardReducer;
