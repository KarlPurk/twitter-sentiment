/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('total-strategies', function(strategiesModule, app) {

        var strategies = {
            sentiment: function(collection) {
                var totals = {
                    positive: 0,
                    negative: 0,
                    neutral: 0,
                    mixed: 0
                };
                collection.forEach(function(tweet) {
                    if (tweet.get('sentiment').mixed)  {
                        totals.mixed++;
                    }
                    totals[tweet.get('sentiment').type]++;
                });

                return totals;
            }
        };

        app.reqres.setHandler('get-total-strategy', function(strategy) {
            return strategies[strategy];
        });

    });

})(window.app);