var _ = require('lodash');
/**
 * GET /account
 * List of API examples.
 */


var Messenger = function(){
	return {
		hello : function(req, res, next) {
			var data = {
				test : 'ok'
			};
			res.setHeader('Cache-Control', 'no-cache');
			res.json(data);
		}
	}
}();


module.exports = Messenger;
