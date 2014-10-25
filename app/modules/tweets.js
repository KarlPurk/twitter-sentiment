/* global app, Backbone, Marionette, $, _, io */
(function(app) {
    "use strict";

    app.module('tweets', function(tweetsModule, app, Backbone, Marionette, $, _) {

        /***********************************************************
         * Models
         ***********************************************************/

        var TweetModel = Backbone.Model.extend({
            getSentimentLabel: function() {
                if (this.get('sentiment').mixed) {
                    return 'mixed';
                }
                return this.get('sentiment').type;
            }
        });

        /***********************************************************
         * Collections
         ***********************************************************/

        this.TweetsCollection = Backbone.Collection.extend({
            model: TweetModel
        });

        var tweets = new this.TweetsCollection();

        /***********************************************************
         * Views
         ***********************************************************/

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
            template: "#tweets-template",
            childView: TweetView,
            childViewContainer: 'tbody',
            collectionEvents: {
                'reset': 'onReset'
            },
            onReset: function () {
                this.render();
            }
        });

        var LayoutView = Marionette.LayoutView.extend({
            template: '#tweets-layout-template',
            className: 'main-content white-box',
            regions: {
                filters: '.options',
                tweets: '.tweets'
            },
            onShow: function() {
                this.getRegion('tweets').show(new TweetsView({
                    collection: this.collection
                }));

                var FiltersView = app.bus.request('get-tweet-filters-view');

                this.getRegion('filters').show(new FiltersView());
            }
        });

        /***********************************************************
         * Event handlers
         ***********************************************************/

        app.bus.on('tweet', function(tweet) {
            tweets.add(tweet);
        });

        /***********************************************************
         * Public interface
         ***********************************************************/

        app.bus.reply('get-tweets', function() {
            return tweets;
        });

        app.bus.reply('get-tweets-view', function() {
            return LayoutView;
        });

    });

})(window.app);
