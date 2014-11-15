/* global require */

module.exports = function(options) {

    /***********************************************************
     * Dependencies
     ***********************************************************/

    options = options || {};
    var _ = options.underscore || require('underscore');
    var Backbone = options.backbone || require('backbone');
    var Marionette = options.marionette || require('backbone.marionette');

    /***********************************************************
     * App creation
     ***********************************************************/

    var app = new Marionette.Application();

    /***********************************************************
     * System bus creation
     ***********************************************************/

    app.bus = _.extend({}, Backbone.Events);
    app.bus = _.extend(app.bus, Backbone.Radio.Commands);
    app.bus = _.extend(app.bus, Backbone.Radio.Requests);

    /***********************************************************
     * System bus usage
     ***********************************************************/

    /**
     * Gets a view object from a module
     */
    app.bus.reply('get-view', function (module, view) {
        return app.bus.request(view + '-view');
    });

    /**
     * Renders a view object from a module to the "main" region
     */
    app.bus.comply('render-view', function (module, view, spec) {
        var View = app.bus.request('get-view', module, view);
        app.getRegion('main').show(new View(spec || {}));
    });

    /***********************************************************
     * Event handlers
     ***********************************************************/

    app.bus.on('search', function (query) {
        var socket = io.connect('http://localhost');
        socket.emit('filter', {track: query});
        socket.on("tweet", function (tweet) {
            app.bus.trigger('tweet', tweet);
        });
    });

    /***********************************************************
     * Application initializers
     ***********************************************************/

    /**
     * App initializers
     */

    app.addInitializer(function () {
        app.addRegions({main: 'main'});
    });

    // Future calls to require('app') will return the instance of app
    module.exports = app;

    return app;
};