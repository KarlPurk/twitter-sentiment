/*jslint node: true */
"use strict";

// Dependencies
var Q = require('q');

function getSentimentFromApi(text)
{
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve(false);
    },500);
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