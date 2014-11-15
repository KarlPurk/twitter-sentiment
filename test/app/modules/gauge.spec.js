/* globals require, describe, it, beforeEach */

var dependencies = require('./../bootstrap')('gauge');
var app = dependencies.app;
var Backbone = dependencies.backbone;
var calculator = require('./../../../app/modules/gauge/percentage-calculator');

describe('gauge module', function() {
    it('must expose a gauge view', function() {
        var view = app.bus.request('gauge-view');
        view.must.be(Backbone.View);
    });
    describe('percentage calculator', function() {
        var collection;
        beforeEach(function() {
            collection = new Backbone.Collection();
        });
        it('must calculate 100% correctly', function() {
            collection.push({ name: 'positive', count: 1 });
            calculator(collection).must.equal(100);
            collection.reset([]);
            collection.push({ name: 'positive', count: 10 });
            calculator(collection).must.equal(100);
            collection.reset([]);
            collection.push({ name: 'positive', count: 100 });
            calculator(collection).must.equal(100);
        });
        it('must calculate 75% correctly', function() {
            collection.push({ name: 'positive', count: 3 });
            collection.push({ name: 'negative', count: 1 });
            calculator(collection).must.equal(75);
        });
        it('must calculate 50% correctly', function() {
            collection.push({ name: 'positive', count: 1 });
            collection.push({ name: 'negative', count: 1 });
            calculator(collection).must.equal(50);
        });
        it('must calculate 25% correctly', function() {
            collection.push({ name: 'positive', count: 1 });
            collection.push({ name: 'negative', count: 3 });
            calculator(collection).must.equal(25);
        });
        it('must calculate 0% correctly', function() {
            collection.push({ name: 'negative', count: 1 });
            calculator(collection).must.equal(0);
            collection.reset([]);
            collection.push({ name: 'negative', count: 10 });
            calculator(collection).must.equal(0);
            collection.reset([]);
            collection.push({ name: 'negative', count: 100 });
            calculator(collection).must.equal(0);
        });
    });
});