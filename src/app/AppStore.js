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

if (process.env.NODE_ENV !== 'production') {
  __DEV__ = true;
}

function createStoreWithMiddleware(reducer) {

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

  return applyMiddleware(...middleware)(createStore)(reducer);

}


export default function configureStore (){
  return (createStoreWithMiddleware)(combineReducers(AppReducers));
}
