/* global require */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
Backbone.Radio = require('backbone.radio');

var app = require('./app');

require('./modules/nav');
require('./modules/dashboard');
require('./modules/search');
require('./modules/sentiments');
require('./modules/tweets');

app.start();