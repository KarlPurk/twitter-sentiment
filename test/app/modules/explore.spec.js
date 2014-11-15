/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap')('explore');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('explore module', function() {
    it('must expose an explore view', function() {
        var view = app.bus.request('explore-view');
        view.must.be(Backbone.View);
    });
});