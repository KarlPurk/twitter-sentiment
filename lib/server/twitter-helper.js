/*jslint node: true */
"use strict";

module.exports = function(twitter) {

    var twitterHelper = {};

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
        console.log(tweet);
    };

    return twitterHelper;
};