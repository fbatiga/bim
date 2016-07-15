var _ = require('lodash');
/**
 * GET /account
 * List of API examples.
 */


var Account = function(){
	return {
		getProfile : function(req, res, next) {
			var data = require('../data/cv/steed/fr');
			res.setHeader('Cache-Control', 'no-cache');
			res.json(data);
		}
	}
}();


module.exports = Account;
