/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap')('explore');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('explore module', function() {
    it('must add an explore-view reply listener to app.bus', function() {
        var view = app.bus.request('explore-view');
        view.must.be(Backbone.View);
    });
});