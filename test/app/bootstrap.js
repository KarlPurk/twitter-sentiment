var Backbone = require('backbone');
Backbone.$ = require('jquery');
Backbone.Radio = require('backbone.radio');
var options = {
    marionette: { Application: function() {
        this.addInitializer = function() {};
    } }
};
require('./../../app/app')(options);