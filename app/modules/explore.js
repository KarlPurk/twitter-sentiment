/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Views
 ***********************************************************/

var ExploreView = Marionette.LayoutView.extend({
    template: '#explore-template',
    className: 'main-content transition-hide',
    regions: {
        tweets: '#tweets'
    },
    onShow: function() {
        var TweetsView = app.bus.request('get-view', 'tweets', 'tweets');
        this.tweets.show(new TweetsView({
            collection: app.bus.request('get-filtered-tweets')
        }));
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('get-explore-view', function() {
    return ExploreView;
});