/*jslint node: true */
"use strict";

module.exports = {
    getSentiment: function(text) {
        var sentiment = {
            score: 0,
            type: 'neutral',
            mixed: false
        };

        return sentiment;
    }
};