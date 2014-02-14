(function(global) {

    var app = new Marionette.Application();

    app.addRegions({
		main: 'main'
    });

    app.module('tweets', function(tweetsModule, app) {
		var tweets = new Backbone.Collection();
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
        var tweetsView = new TweetsView({
			collection: tweets 
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
            app.getRegion('main').show(tweetsView);
        });
    });

    global.app = app;
})(window);
