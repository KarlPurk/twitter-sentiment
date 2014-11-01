/* global require */

/***********************************************************
 * Configure dependencies
 ***********************************************************/
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
Backbone.Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Require app modules
 ***********************************************************/

var app = require('./app');

require('./modules/nav');
require('./modules/dashboard');
require('./modules/search');
require('./modules/sentiments');
require('./modules/tweets');
require('./modules/filters');
require('./modules/gauge');
require('./modules/explore');

/***********************************************************
 * Start the app
 ***********************************************************/

app.start();