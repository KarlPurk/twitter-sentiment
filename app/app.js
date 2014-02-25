(function(global) {
    "use strict";

    var app = new Marionette.Application();

    app.module('tweets', function(tweetsModule, app) {
        var getTotalsStrategies = {
            default: function(collection) {
                var totals = {
                        positive: 0,
                        negative: 0,
                        neutral: 0,
                        mixed: 0
                    };

                collection.forEach(function(tweet) {
                    if (tweet.get('sentiment').mixed)  {
                        totals['mixed']++;
                        return;
                    }
                    totals[tweet.get('sentiment').type]++;
                });

                return totals;
            }
        };
        var TweetsCollection = Backbone.Collection.extend({
            getTotals: function(strategy) {
                return getTotalsStrategies[strategy](this);
            }
        });
		var tweets = new TweetsCollection();
        var TweetView = Marionette.ItemView.extend({
            tagName: 'tr',
			template: "#tweet-template",
            templateHelpers: {
                getSentimentClass: function() {
                    if (this.sentiment.type === 'positive') {
                        return 'label-success';
                    }
                    else if (this.sentiment.type === 'negative') {
                        return 'label-danger';
                    }
                    return 'label-info';
                }
            }
		});
        var TweetsView = Marionette.CompositeView.extend({
            className: 'white-box',
            template: "#tweets-template",
            itemView: TweetView,
            itemViewContainer: 'tbody'
		});
        var TotalTweetsView = Marionette.ItemView.extend({
            className: 'white-box',
            template: '#total-tweets-template',
            initialize: function() {
                // Re-render the view when a model is added to the associated view collection
                this.listenTo(this.collection, "add", this.render);
            },
            serializeData: function() {
                return this.collection.getTotals('default');
            }
        });
        tweetsModule.addInitializer(function() {
            var socket = io.connect('http://localhost');
            socket.emit('filter', { track: 'javascript' });
            socket.on("tweet", function(tweet) {
                tweets.add(tweet);
                // TODO: Dev only.  Remove at some point in time!
                if (tweets.length == 5) {
                    socket.disconnect();
                }
            });
        });
        tweetsModule.addInitializer(function() {
            var tweetsView = new TweetsView({
                collection: tweets
            });
            app.getRegion('tweets').show(tweetsView);
        });
        tweetsModule.addInitializer(function() {
            var totalTweetsView = new TotalTweetsView({
                collection: tweets
            });
            app.getRegion('totals').show(totalTweetsView);
        });
    });

    app.addRegions({
        tweets: '#tweets',
        totals: '#totals'
    });

    global.app = app;

})(window);
