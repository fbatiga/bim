'use strict'
import { handleActions } from 'redux-actions';
import { ADD_ACCOUNT_INIT } from './AddAccountAction';

const initialState = {
};

const AddAccountReducer = handleActions({
},
initialState);

export default AddAccountReducer;
