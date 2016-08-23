'use strict'
import { handleActions } from 'redux-actions';
import { JACKPOT_INIT } from './JackpotAction';

const initialState = {
};

const JackpotReducer = handleActions({
},
initialState);

export default JackpotReducer;
