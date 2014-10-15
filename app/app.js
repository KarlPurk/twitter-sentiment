/* global Backbone, Marionette */
(function(global) {
    "use strict";

    var app = new Marionette.Application();

    /**
     * Request-response handlers
     */

    /**
     * Gets a view object from a module
     */
    app.reqres.setHandler('get-view', function (module, view) {
        return app.module(module).reqres.request('get-' + view + '-view');
    });

    /**
     * Renders a view object from a module to the "main" region
     */
    app.commands.setHandler('render-view', function (module, view, spec) {
        var View = app.request('get-view', module, view);
        app.getRegion('main').show(new View(spec || {}));
    });

    /**
     * App initializers
     */

    app.addInitializer(function() {
        app.addRegions({main: 'main'});
    });

    /**
     * Global pollution
     */
    global.app = app;

})(window);
