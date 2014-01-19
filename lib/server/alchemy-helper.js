/*jslint node: true */
"use strict";

// Dependencies
var Q = require('q'),
    config = require('./config'),
    registry = require('./registry'),
    AlchemyAPI = registry.get('alchemy-api'),
    alchemyApi = new AlchemyAPI(config.alchemy.key);

/**
 * Alchemy API helper module.
 * Provides an facade for working with the Alchemy API module.
 * Providing a simple interface for grabbing the sentiment of
 * some text and returning a subset of the response data tailored
 * to our needs.
 * @type {{getSentiment: Function}}
 */
module.exports = {

    /**
     * Returns the sentiment for a text string.
     * @param text
     * @returns {Q.promise}
     */
    getSentiment: function(text) {

        var deferred = Q.defer();

        /**
         * Check the response for errors
         * @param response
         */
        function checkResponse(response) {
            if (response.status !== 'ERROR') {
                return;
            }
            if (response.statusInfo === 'daily-transaction-limit-exceeded') {
                throw new Error('Daily transaction limit exceeded for Alchemy API');
            }
        }

        /**
         * Processes the raw alchemy API response and extracts
         * properties of interest.
         * @param response
         * @returns {{score: number, type: string, mixed: boolean}}
         */
        function processResponse(response) {
            if (response.docSentiment === undefined) {
                throw new Error('No sentiment returned from Alchemy API.');
            }
            return {
                score: response.docSentiment.score === undefined ? 0 : Math.abs(+response.docSentiment.score),
                type: response.docSentiment.type.toLowerCase(),
                mixed: response.docSentiment.mixed !== undefined
            };
        }

        // Ask the API to determine the sentiment for the text string
        alchemyApi.sentiment(text, {}, function(err, response) {
            if (err) {
                throw err;
            }
            // Ensure the response is ok
            checkResponse(response);
            // Process the raw response and resolve the promise with the result
            deferred.resolve(processResponse(response));
        });

        return deferred.promise;
    }
};