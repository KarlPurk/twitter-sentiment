/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var tweets = app.bus.request('tweets');
var sentiments = app.bus.request('sentiments');
var TweetsCollection = app.bus.request('tweets-collection');

/***********************************************************
 * Models
 ***********************************************************/

var Filter = Backbone.Model.extend({
    defaults: {
        active: false,
        count: 0,
        name: ''
    }
});

/***********************************************************
 * Collections
 ***********************************************************/

var Filters = Backbone.Collection.extend({
    model: Filter
});

var filters = new Filters();

var filteredTweets = new TweetsCollection();

/***********************************************************
 * Views
 ***********************************************************/

var FilterView = Marionette.ItemView.extend({
    tagName: 'span',
    template: '#tweet-filter-template',
    events: {
        'click': 'onClick'
    },
    modelEvents: {
        'change': 'render'
    },
    onRender: function() {
        if (!this.model.get('count')) {
            return this.$el.hide();
        }
        this.$el.show();
    },
    classNameMap: {
        positive: 'label-success',
        negative: 'label-danger',
        mixed: 'label-warning',
        neutral: 'label-info'
    },
    attributes: function() {
        return {
            class: this.getClassName(this.model)
        };
    },
    refreshAttributes: function() {
        this.$el.attr(this.attributes());
    },
    getClassName: function (model) {
        var getClassNameBySentiment = function(model) {
            if (model.get('active')) {
                return 'label-default';
            }
            return this.classNameMap[model.get('name')];
        }.bind(this);
        return ['tweet-filter', 'label', model.get('name'), getClassNameBySentiment(model)].join(' ');
    },
    onClick: function() {
        this.model.set('active', !this.model.get('active'));
        this.refreshAttributes();
    }
});

var FiltersView = Marionette.CompositeView.extend({
    template: '#tweet-filters-template',
    childView: FilterView,
    collection: filters
});

/***********************************************************
 * Util methods
 ***********************************************************/

var updateFilteredTweets = function() {
    var activeFilters = filters.filter(function(model) {
        return model.get('active');
    });
    var blacklist = activeFilters.map(function(model) {
        return model.get('name');
    });
    var result = tweets.filter(function(model) {
        return blacklist.indexOf(model.getSentimentLabel()) === -1;
    });
    filteredTweets.reset(result);
};

/***********************************************************
 * Event handlers
 ***********************************************************/

filters.on('change', function() {
    updateFilteredTweets();
});

sentiments.on('add', function(sentiment) {
    filters.add(sentiment.toJSON());
    updateFilteredTweets();
});

sentiments.on('change:count', function(sentiment) {
    filters.findWhere({name: sentiment.get('name')}).set('count', sentiment.get('count'));
    updateFilteredTweets();
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('filtered-tweets', function() {
    return filteredTweets;
});

app.bus.reply('tweet-filters-view', function() {
    return FiltersView;
});