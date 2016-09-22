"use strict";

import { createStore, combineReducers, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
//import promiseMiddleware from 'redux-promise';
import LoggerMiddleware from 'redux-logger';
import ApiMiddleware from './middleware/ApiMiddleware';
import AppReducers from './AppReducers';

/**
* Creates a preconfigured store for this example.
*/

const middleware = [ApiMiddleware];

if (__DEV__) {
const logger = LoggerMiddleware({
	    actionTransformer: (action) => {
     return {
       ...action,
       type: String(action.type),
     };
   },
 });

middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(combineReducers(AppReducers));

export default function configureStore(){
  return store;
}
