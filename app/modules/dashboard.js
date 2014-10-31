/* global require */

var app = require('./../app');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Views
 ***********************************************************/

//noinspection JSUnusedGlobalSymbols
var DashboardView = Marionette.LayoutView.extend({
    template: '#dashboard-template',
    className: 'main-content transition-hide',
    regions: {
        sentiments: '#sentiments',
        search: '#search',
        gauge: '#gauge',
        tweets: '#tweets'
    },
    onShow: function() {
        var SearchView = app.bus.request('get-view', 'search', 'search');
        this.search.show(new SearchView());
        return;
        var SentimentsView = app.bus.request('get-view', 'sentiments', 'sentiments'),
            TweetsView = app.bus.request('get-view', 'tweets', 'tweets'),
            GaugeView = app.bus.request('get-view', 'gauge', 'gauge');
        this.gauge.show(new GaugeView({
            collection: app.bus.request('get-sentiments')
        }));
        this.sentiments.show(new SentimentsView());
        this.tweets.show(new TweetsView({
            collection: app.bus.request('get-filtered-tweets')
        }));
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('get-dashboard-view', function() {
    return DashboardView;
});