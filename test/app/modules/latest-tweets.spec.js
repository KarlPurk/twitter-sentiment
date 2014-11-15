/* globals require, describe, it, beforeEach */

var dependencies = require('./../dependencies');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('latest-tweets module', function() {
    before(function() {
        app.bus.reply('tweets-collection', function() {
            return Backbone.Collection;
        });
        app.bus.reply('tweets', function() {
            return new Backbone.Collection();
        });
        require('./../bootstrap')('latest-tweets');
    });
    after(function() {
        app.bus.stopReplying('tweets-collection');
        app.bus.stopReplying('tweets');
    });
    it('must add a latest-tweets-view reply listener to app.bus', function() {
        var view = app.bus.request('latest-tweets-view');
        view.must.be(Backbone.View);
    });
    it('must add a latest-tweets reply listener to app.bus', function() {
        var collection = app.bus.request('latest-tweets');
        collection.must.be.instanceOf(Backbone.Collection);
    });
});