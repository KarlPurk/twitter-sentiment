/**
 * Return a function that can be invoked by passing a module name.
 * The module is then loaded, passing in a stub marionette object.
 */
module.exports = function(moduleDependency) {

    var Backbone = require('./dependencies').backbone;

    var viewStub = {
        extend: function () {
            return Backbone.View;
        }
    };

    var options = {
        marionette: {
            LayoutView: viewStub,
            ItemView: viewStub,
            CompositeView: viewStub
        }
    };

    // Load the module, injecting the stub dependency defined above
    require('./../../app/modules/' + moduleDependency)(options);
};