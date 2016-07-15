/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var _ = require('lodash');
var path = require('path');
var api = require('./api');


/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.set('port', 3000);

app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }))

api.configure(app);

app.get('*', function(req, res) {
    res.redirect('/');
});

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
    console.log('Client root : %s ', 3000);
});

module.exports = app;

