/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

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
        var SearchView = app.bus.request('get-view', 'search', 'search'),
            SentimentsView = app.bus.request('get-view', 'sentiments', 'sentiments'),
            LatestTweetsView = app.bus.request('get-view', 'latest-tweets', 'latest-tweets'),
            GaugeView = app.bus.request('get-view', 'gauge', 'gauge');
        this.search.show(new SearchView());
        this.sentiments.show(new SentimentsView());
        this.tweets.show(new LatestTweetsView({
            collection: app.bus.request('latest-tweets')
        }));
        this.gauge.show(new GaugeView({
            collection: app.bus.request('sentiments')
        }));
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('dashboard-view', function() {
    return DashboardView;
});