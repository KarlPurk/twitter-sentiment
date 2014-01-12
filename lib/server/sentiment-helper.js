/*jslint node: true */
"use strict";

// Dependencies
var Q = require('q');

module.exports = (function() {

    var apiHelper = false;

    return {

        getApiHelper: function() {
            if (!apiHelper) {
                apiHelper = require('./alchemy-helper');
            }
            return apiHelper;
        },

        getSentiment: function(text) {

            var deferred = Q.defer();

            var defaultSentiment = {
                score: 0,
                type: 'neutral',
                mixed: false
            };

            this.getApiHelper().getSentiment(text).then(
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
})();