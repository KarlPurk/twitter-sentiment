/*jslint node: true */
"use strict";

// Dependencies
var config = require('./config'),
    Twit = require('twit'),
    twitter = new Twit(config.twit),
    sentimentHelper = require('./sentiment-helper');

/**
 * Twitter Helper Module.
 * Provides an facade for working with the Twit module.
 * Providing a simple interface for creating and maintaining
 * a single filtered tweet stream.
 * @type {{createTweetStream: Function, processTweet: Function}}
 */
module.exports = {

    /**
     * Creates a new filtered tweet stream.
     * @param track The term(s) to filter the stream by
     * @param socket The socket that will receive tweet events from the steam
     */
    createTweetStream: function(track, socket) {
        var self = this;
        if (this.twitterStream) {
            this.twitterStream.stop();
        }
        this.twitterStream = twitter.stream('statuses/filter', {track: track});

        // Event handler for handling tweet events
        this.twitterStream.on('tweet', function(tweet) {
            self.processTweet(tweet, socket);
        });
    },

    /**
     * Callback method for handling tweets received from the filtered tweet stream.
     * Processes the raw tweet, adding a sentiment through the use of a service,
     * then emits a tweet event on the socket that the client is listening on
     * for each processed tweet.
     * @param tweet The raw tweet received from the twitter stream
     * @param socket The socket that will receive the tweet events
     */
    processTweet: function(tweet, socket) {
        sentimentHelper.getSentiment(tweet.text).then(function(sentiment) {
            tweet.sentiment = sentiment;
            socket.emit('tweet', tweet);
        });
    }
};