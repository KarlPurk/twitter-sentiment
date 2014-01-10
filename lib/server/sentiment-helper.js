/*jslint node: true */
"use strict";

// Dependencies
var Q = require('q');

function getSentimentFromApi(text) {

    var // Dependencies
        config = require('./config'),
        AlchemyAPI = require('alchemy-api'),

        // Variables
        alchemy = new AlchemyAPI(config.alchemy.key),
        deferred = Q.defer();

    function processResponse(response) {
        if (response.docSentiment !== undefined) {
            return {
                score: response.docSentiment.score === undefined ? 0 : Math.abs(+response.docSentiment.score),
                type: response.docSentiment.type.toLowerCase(),
                mixed: response.docSentiment.mixed === undefined ? false : true
            };
        }
    }

    alchemy.sentiment(text, {}, function(err, response) {
        if (err) {
            throw err;
        }
        deferred.resolve(processResponse(response));
    });

    return deferred.promise;
}

module.exports = {
    getSentiment: function(text) {

        var deferred = Q.defer();

        var defaultSentiment = {
            score: 0,
            type: 'neutral',
            mixed: false
        };

        getSentimentFromApi(text).then(
            function(sentiment) {
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