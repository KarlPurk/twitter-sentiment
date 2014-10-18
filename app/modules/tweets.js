/* global Backbone, io, Marionette */
(function(app) {
    "use strict";

    app.module('tweets', function(tweetsModule, app) {

        this.bus = _.extend({}, Backbone.Radio.Requests);

        var TweetsCollection = Backbone.Collection.extend({
            getTotals: function(strategy) {
                strategy = strategy || 'sentiment';
                return app.reqres.request('get-total-strategy', strategy)(this);
            }
        });

        var tweets = new TweetsCollection();

        //noinspection JSUnusedGlobalSymbols
        var TweetView = Marionette.ItemView.extend({
            tagName: 'tr',
            template: "#tweet-template",
            templateHelpers: {
                getSentimentClass: function() {
                    if (this.sentiment.mixed) {
                        return 'label-warning';
                    }
                    else if (this.sentiment.type === 'positive') {
                        return 'label-success';
                    }
                    else if (this.sentiment.type === 'negative') {
                        return 'label-danger';
                    }
                    return 'label-info';
                },
                getSentimentLabel: function() {
                    if (this.sentiment.mixed) {
                        return 'mixed';
                    }
                    return this.sentiment.type;
                }
            }
        });

        var TweetsView = Marionette.CompositeView.extend({
            className: 'main-content white-box',
            template: "#tweets-template",
            childView: TweetView,
            childViewContainer: 'tbody'
        });

        tweetsModule.addInitializer(function() {
            var socket = io.connect('http://localhost');
            socket.emit('filter', { track: 'javascript' });
            socket.on("tweet", function(tweet) {
                tweets.add(tweet);
            });
        });

        app.bus.reply('get-tweets', function() {
            return tweets;
        });

        this.bus.reply('get-tweets-view', function() {
            return TweetsView;
        });

    });

})(window.app);
