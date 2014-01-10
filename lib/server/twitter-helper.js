/*jslint node: true */
"use strict";

var // Dependencies
    config = require('./config'),
    Twit = require('twit'),

    // Variables
    twitter = new Twit(config.twit),
    twitterHelper = {};

/**
 * Creates a new filtered tweet stream.
 *
 * @param track The term(s) to filter the stream by
 */
twitterHelper.createTweetStream = function(track) {
    if (twitterHelper.twitterStream) {
        twitterHelper.twitterStream.stop();
    }
    twitterHelper.twitterStream = twitter.stream('statuses/filter', {track: track});
    twitterHelper.twitterStream.on('tweet', twitterHelper.processTweet);
};

/**
 * Callback method for handling tweets received from the filtered tweet stream.
 *
 * @param tweet The raw tweet received from the stream
 */
twitterHelper.processTweet = function(tweet) {
    var sentimentHelper = require('./sentiment-helper');
    sentimentHelper.getSentiment(tweet.text).then(function(sentiment) {
        tweet.sentiment = sentiment;
    });
};

module.exports = twitterHelper;