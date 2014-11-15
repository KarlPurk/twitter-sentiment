/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap');
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
        require('./../module')('latest-tweets');
    });
    after(function() {
        app.bus.stopReplying('tweets-collection');
        app.bus.stopReplying('tweets');
    });
    it('must expose a latest tweets view', function() {
        var view = app.bus.request('latest-tweets-view');
        view.must.be(Backbone.View);
    });
    it('must expose a latest tweets collection', function() {
        var collection = app.bus.request('latest-tweets');
        collection.must.be.instanceOf(Backbone.Collection);
    });
});