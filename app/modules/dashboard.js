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
        return;
        var SentimentsView = app.bus.request('get-view', 'sentiments', 'sentiments'),
            TweetsView = app.bus.request('get-view', 'tweets', 'tweets'),
            GaugeView = app.bus.request('get-view', 'gauge', 'gauge'),
            SearchView = app.bus.request('get-view', 'search', 'search');
        this.sentiments.show(new SentimentsView());
        this.gauge.show(new GaugeView({
            collection: app.bus.request('get-sentiments')
        }));
        this.tweets.show(new TweetsView({
            collection: app.bus.request('get-filtered-tweets')
        }));
        this.search.show(new SearchView());
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('get-dashboard-view', function() {
    return DashboardView;
});