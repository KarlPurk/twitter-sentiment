/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('dashboard module', function() {
    before(function() {
        require('./../module')('dashboard');
    });
    it('must expose a dashboard view', function() {
        var view = app.bus.request('dashboard-view');
        view.must.be(Backbone.View);
    });
});