/* globals require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var _= require('underscore');
var Marionette = require('backbone.marionette');
var TweetCollection = app.bus.request('tweets-collection');
var tweets = app.bus.request('tweets');

/***********************************************************
 * Collections
 ***********************************************************/

var latestTweets = new TweetCollection();

tweets.on('add', function(tweet) {
    if (latestTweets.length === 5) {
        latestTweets.remove(latestTweets.at(latestTweets.length - 1));
    }
    latestTweets.unshift(tweet);
});

/***********************************************************
 * Views
 ***********************************************************/

var TweetView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'latest-tweet',
    template: "#latest-tweets-item-template",
    templateHelpers: {
        getSentimentClass: function() {
            if (this.sentiment.mixed) {
                return 'alert-warning';
            }
            else if (this.sentiment.type === 'positive') {
                return 'alert-success';
            }
            else if (this.sentiment.type === 'negative') {
                return 'label-danger';
            }
            return 'alert-info';
        }
    }
});

var LatestTweetsView = Marionette.CompositeView.extend({
    template: '#latest-tweets-template',
    className: 'main-content white-box',
    childView: TweetView,
    childViewContainer: '.latest-tweets'
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('latest-tweets-view', function() {
    return LatestTweetsView;
});

app.bus.reply('latest-tweets', function() {
    return latestTweets;
});