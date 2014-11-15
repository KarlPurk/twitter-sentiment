/* globals require */

module.exports = function(options) {

    /***********************************************************
     * Dependencies
     ***********************************************************/

    options = options || {};
    var app = options.app || require('./../app');
    var Marionette = options.marionette || require('backbone.marionette');

    /***********************************************************
     * System bus dependencies
     ***********************************************************/

    var TweetCollection = app.bus.request('tweets-collection');
    var tweets = app.bus.request('tweets');

    /***********************************************************
     * Collections
     ***********************************************************/

    var latestTweets = new TweetCollection();

    tweets.on('add', function (tweet) {
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
            getSentiment: function () {
                if (this.sentiment.mixed) {
                    return 'mixed';
                }
                return this.sentiment.type;
            }
        }
    });

    var LatestTweetsView = Marionette.CompositeView.extend({
        template: '#latest-tweets-template',
        className: 'main-content widget',
        childView: TweetView,
        childViewContainer: '.latest-tweets'
    });

    /***********************************************************
     * Public interface
     ***********************************************************/

    app.bus.reply('latest-tweets-view', function () {
        return LatestTweetsView;
    });

    app.bus.reply('latest-tweets', function () {
        return latestTweets;
    });
};