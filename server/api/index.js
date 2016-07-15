var MessengerApi  = require('./MessengerApi');

var Api = function(){
	return {
		messenger : MessengerApi,
		configure : function(app){
			app.get('/messenger/hello', MessengerApi.hello);
		}
	}
}();

module.exports = Api;
