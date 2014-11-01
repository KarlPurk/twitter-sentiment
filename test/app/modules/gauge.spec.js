/* globals require, describe, it, beforeEach */
var assert = require('assert');
require('./../bootstrap');
var Backbone = require('backbone');
var calculator = require('./../../../app/modules/gauge/percentage-calculator');

describe('gauge percentage calculator', function() {
    var collection;
    beforeEach(function() {
        collection = new Backbone.Collection();
    });
    it('calculates 100% correctly', function() {
        collection.push({ name: 'positive', count: 1 });
        assert.equal(calculator(collection), 100);
        collection.reset([]);
        collection.push({ name: 'positive', count: 10 });
        assert.equal(calculator(collection), 100);
        collection.reset([]);
        collection.push({ name: 'positive', count: 100 });
        assert.equal(calculator(collection), 100);
    });
    it('calculates 75% correctly', function() {
        collection.push({ name: 'positive', count: 3 });
        collection.push({ name: 'negative', count: 1 });
        assert.equal(calculator(collection), 75);
    });
    it('calculates 50% correctly', function() {
        collection.push({ name: 'positive', count: 1 });
        collection.push({ name: 'negative', count: 1 });
        assert.equal(calculator(collection), 50);
    });
    it('calculates 25% correctly', function() {
        collection.push({ name: 'positive', count: 1 });
        collection.push({ name: 'negative', count: 3 });
        assert.equal(calculator(collection), 25);
    });
    it('calculates 0% correctly', function() {
        collection.push({ name: 'negative', count: 1 });
        assert.equal(calculator(collection), 0);
        collection.reset([]);
        collection.push({ name: 'negative', count: 10 });
        assert.equal(calculator(collection), 0);
        collection.reset([]);
        collection.push({ name: 'negative', count: 100 });
        assert.equal(calculator(collection), 0);
    });
});