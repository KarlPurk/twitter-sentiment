// All tests require access to must
require('must');

// Configure Backbone for node environment
var Backbone = require('backbone');
Backbone.$ = require('jquery');
Backbone.Radio = require('backbone.radio');

// Create a stub marionette object - this is injected into the app module
var options = {
    marionette: { Application: function() {
        this.addInitializer = function() {};
    } }
};

// Require the app, passing in the stub marionette object
var app = require('./../../../app/app')(options);

module.exports = require('./dependencies');