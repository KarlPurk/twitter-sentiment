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
var app = require('./../../app/app')(options);

// Return a function that can be invoked by passing a module name.
// The module is then loaded, passing in a stub marionette object.
module.exports = function(moduleDependency) {

    var options = {
        marionette: { LayoutView: { extend: function() { return Backbone.View; } } }
    };

    // Load the module, injecting the stub dependency defined above
    require('./../../app/modules/' + moduleDependency)(options);

    // Return a hash of dependencies for easy reference in tests
    // This simply avoids having to require these common dependencies
    // in each test which results in cleaner tests that avoid stupidly
    // long relative paths.
    return {
        app: app,
        backbone: Backbone
    };
};