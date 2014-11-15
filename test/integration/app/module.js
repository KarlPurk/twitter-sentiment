/**
 * Loads the specified module and prepares it for testing.
 */
module.exports = function(moduleDependency) {

    var Backbone = require('./dependencies').backbone;

    /**
     * Abstracted view stub.
     */
    var viewStub = {
        extend: function () {
            return Backbone.View;
        }
    };

    /**
     * Marionette stub.
     * Unfortunately marionette directly uses the document object
     * which isn't available in the node environment.  To work
     * around this issue we pass in a Marionette stub to each
     * module as the Marionette dependency.
     */
    var options = {
        marionette: {
            LayoutView: viewStub,
            ItemView: viewStub,
            CompositeView: viewStub
        }
    };

    // Load the module, injecting the stub dependency defined above
    require('./../../../app/modules/' + moduleDependency)(options);
};