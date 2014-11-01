/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

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

var TweetsCollection = Backbone.Collection.extend({
    model: TweetModel
});

var tweets = new TweetsCollection();

/***********************************************************
 * Event handlers
 ***********************************************************/

app.bus.on('tweet', function(tweet) {
    tweets.add(tweet);
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('tweets', function() {
    return tweets;
});

app.bus.reply('tweets-collection', function() {
    return TweetsCollection;
});