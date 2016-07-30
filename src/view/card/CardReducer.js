"use strict";

import { handleActions } from 'redux-actions';
import { CARD_REQUEST, CARD_SUCCESS, CARD_FAILURE } from './CardConstant';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const CardReducer = handleActions({

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
