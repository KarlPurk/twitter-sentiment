/* global Backbone, Marionette */
(function(global) {
    "use strict";

    var app = new Marionette.Application();

    app.bus = _.extend({}, Backbone.Events);
    app.bus = _.extend(app.bus, Backbone.Radio.Commands);
    app.bus = _.extend(app.bus, Backbone.Radio.Requests);

    /**
     * Request-response handlers
     */

    /**
     * Gets a view object from a module
     */
    app.bus.reply('get-view', function (module, view) {
        return app.bus.request('get-' + view + '-view');
    });

    /**
     * Renders a view object from a module to the "main" region
     */
    app.bus.comply('render-view', function (module, view, spec) {
        var View = app.bus.request('get-view', module, view);
        app.getRegion('main').show(new View(spec || {}));
    });

    app.bus.on('search', function(query) {
        var socket = io.connect('http://localhost');
        socket.emit('filter', { track: query });
        socket.on("tweet", function(tweet) {
            app.bus.trigger('tweet', tweet);
        });
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
