/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('gauge module', function() {
    before(function() {
        require('./../module')('gauge');
    });
    it('must expose a gauge view', function() {
        var view = app.bus.request('gauge-view');
        view.must.be(Backbone.View);
    });
});