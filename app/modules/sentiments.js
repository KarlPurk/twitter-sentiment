/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('sentiments', function(sentimentsModule, app, Backbone, Marionette, $, _) {

        /***********************************************************
         * Models
         ***********************************************************/

        var Sentiment = Backbone.Model.extend({
            defaults: {
                name: '',
                count: 0
            }
        });

        /***********************************************************
         * Collections
         ***********************************************************/

        var Sentiments = Backbone.Collection.extend({
            model: Sentiment
        });

        var sentiments = new Sentiments();

        /***********************************************************
         * Views
         ***********************************************************/
        
        var SentimentView = Marionette.ItemView.extend({
            tagName: 'tr',
            template: '#sentiment-template',
            modelEvents: {
                'change:count': 'render'
            }
        });

        var SentimentsView = Marionette.CompositeView.extend({
            className: 'white-box',
            template: '#sentiments-template',
            childView: SentimentView,
            childViewContainer: 'tbody',
            collection: sentiments
        });

        /***********************************************************
         * Module initializers
         ***********************************************************/

        this.addInitializer(function() {
            app.bus.request('get-tweets').on('add', function(tweet) {
                var total = sentiments.findWhere({name: tweet.getSentimentLabel()});
                if (!total) {
                    total = sentiments.add({
                        name: tweet.getSentimentLabel(),
                        count: 1
                    });
                    return;
                }
                total.set('count', total.get('count') + 1);
            });
        });

        /***********************************************************
         * Public interface
         ***********************************************************/

        app.bus.reply('get-sentiments-view', function() {
            return SentimentsView;
        });

        app.bus.reply('get-sentiments', function() {
            return sentiments;
        });

    });

})(window.app);