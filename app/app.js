(function(global) {
    var app = new Marionette.Application();
    app.addRegions({
		main: 'main'
    });
    app.module('tweets', function() {
		var tweets = new Backbone.Collection();
		var TweetView = Marionette.ItemView.extend({
			template: "#tweet-template"
		});
		var TweetsView = Marionette.CollectionView.extend({
			itemView: TweetView
		});
		var tweetsView = new TweetsView({
			collection: tweets 
		});
		var socket = io.connect('http://localhost');
		socket.emit('filter', { track: 'javascript' });
		socket.on("tweet", function(tweet) {
			console.log(tweets.add(tweet));
		});
		app.getRegion('main').show(tweetsView);
    });
    global.app = app;
})(window);
