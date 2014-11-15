/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap');
var app = dependencies.app;
var Backbone = dependencies.backbone;

describe('search module', function() {
    before(function() {
        require('./../module')('search');
    });
    it('must expose a search view', function() {
        var view = app.bus.request('search-view');
        view.must.be(Backbone.View);
    });
});