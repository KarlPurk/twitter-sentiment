/*jslint node: true */
"use strict";

var // Dependencies
    Q = require('q'),
    alchemyHelper = require('./alchemy-helper');

/**
 * Sentiment Helper Module.
 * Provides a sentiment for a given string of text.
 * @type {{getSentiment: Function}}
 */
module.exports = {

    /**
     * Determines the sentiment of some text.
     * @param text
     * @returns {Q.promise}
     */
    getSentiment: function(text) {

        var deferred = Q.defer();

        /**
         * The default sentiment object to return if no
         * sentiment can be determined.
         * @type {{score: number, type: string, mixed: boolean}}
         */
        var defaultSentiment = {
            score: 0,
            type: 'neutral',
            mixed: false
        };

        // Using the alchemy API helper determine
        // the sentiment of the specified text
        alchemyHelper.getSentiment(text).then(
            function(sentiment) {
                // TODO: Pehaps we should throw an error instead of returning a default/neutral sentiment when a sentiment cannot be determined.
                sentiment = sentiment || defaultSentiment;
                deferred.resolve(sentiment);
            },
            function(err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }
};