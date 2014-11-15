/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap')('dashboard');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('dashboard module', function() {
    it('must add a dashboard-view reply listener to app.bus', function() {
        var view = app.bus.request('dashboard-view');
        view.must.not.instanceOf(Backbone.View);
    });
});