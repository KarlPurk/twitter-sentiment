/* globals require, describe, it, beforeEach */

require('must');
require('./../bootstrap');

var Backbone = require('backbone');
var app = require('./../../../app/app');
var options = {
    marionette: { LayoutView: { extend: function() { return Backbone.View; } } }
};

require('./../../../app/modules/dashboard')(options);

describe('dashboard module', function() {
    it('must add a dashboard-view reply listener to app.bus', function() {
        var view = app.bus.request('dashboard-view');
        view.must.not.instanceOf(Backbone.View);
    });
});