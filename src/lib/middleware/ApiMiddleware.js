'use strict';

function checkStatus(response) {
	if (response.ok) {
        return response;
    } else {
    	var error = new Error(response.statusText);
    	error.response = response;
    	throw error;
    }
}

function parseJSON(response) {
	return response.json();
}


const API_KEY = '3c38ca9232b72a23e0b7497a60664c48';
const MOTION_URL = 'https://api.motion.ai';



export default ({getState, dispatch}) => next => action => {

	if (typeof action === 'function') {
		return action(dispatch, getState);
	}

	const { api, motion, params, types, options = {}, ...rest } = action;
	if (!api && !motion) {
		return next(action);
	}

	let url;

	if(motion){
		url = MOTION_URL + motion;
	}else{
		url = api;
	}

	options.headers ={
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};


    //   options.credentials =  'include' ;

    if(params){
    	if(motion){
    		params.key = API_KEY;
    		params.bot = 7302;


    		options.method = 'GET';

    		var str = "?" + Object.keys(params).map(function(prop) {
    			return [prop, params[prop]].map(encodeURIComponent).join("=");
    		}).join("&");

    		url += str;

    	}else{

    		options.method = 'POST';
    		options.body = JSON.stringify(params);

    	}

    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((result) => {
    	if (result.error !==  undefined) {
    		throw new Error(result.error);
    	}else{
    		next({...rest, result, type: SUCCESS});
    	}
    })
    .catch((error)=> {
    	const response = error.response;

    	if(response===undefined){
    		next({...rest, error, type: FAILURE});
    	}else{
    		parseJSON(response)
    		.then(function(json){
    			error.status = response.status;
    			error.statusText = response.statusText;
    			error.message = json.message;
    			console.error(error);

    			next({...rest, error, type: FAILURE});
    		});
    	}
    });
};
