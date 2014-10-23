    /* global app, Backbone, Marionette, $, _, io */
(function(app) {
    "use strict";

    app.module('tweets', function(tweetsModule, app, Backbone, Marionette, $, _) {

        /***********************************************************
         * Dependencies
         ***********************************************************/

        var tweets = app.bus.request('get-tweets');

        /***********************************************************
         * Models
         ***********************************************************/

        var Filter = Backbone.Model.extend({
            defaults: {
                active: false,
                count: 0,
                name: ''
            }
        });

        /***********************************************************
         * Collections
         ***********************************************************/

        var Filters = Backbone.Collection.extend({
            model: Filter
        });

        var filters = new Filters();

        var filteredTweets = new this.TweetsCollection();

        /***********************************************************
         * Views
         ***********************************************************/

        var FilterView = Marionette.ItemView.extend({
            tagName: 'span',
            template: '#tweet-filter-template',
            events: {
                'click': 'onClick'
            },
            modelEvents: {
                'change': 'render'
            },
            onRender: function() {
                if (!this.model.get('count')) {
                    return this.$el.hide();
                }
                this.$el.show();
            },
            classNameMap: {
                positive: 'label-success',
                negative: 'label-danger',
                mixed: 'label-warning',
                neutral: 'label-default'
            },
            attributes: function() {
                return {
                    class: this.getClassName(this.model)
                };
            },
            refreshAttributes: function() {
                this.$el.attr(this.attributes());
            },
            getClassName: function (model) {
                var getClassNameBySentiment = function(model) {
                    if (model.get('active')) {
                        return 'label-default';
                    }
                    return this.classNameMap[model.get('name')];
                }.bind(this);
                return ['tweet-filter', 'label', getClassNameBySentiment(model)].join(' ');
            },
            onClick: function() {
                this.model.set('active', !this.model.get('active'));
                this.refreshAttributes();
            }
        });

        var FiltersView = Marionette.CompositeView.extend({
            template: '#tweet-filters-template',
            childView: FilterView,
            collection: filters
        });

        /***********************************************************
         * Public interface
         ***********************************************************/

        app.bus.reply('get-filtered-tweets', function() {
            return filteredTweets;
        });

        app.bus.reply('get-tweet-filters-view', function() {
            return FiltersView;
        });

        /***********************************************************
         * Util methods
         ***********************************************************/

        var convertTotalsToObjects = function(totals) {
            return Object.keys(totals).reduce(function(last, cur) {
                var obj = {
                    name: cur,
                    count: totals[cur]
                };
                last.push(obj);
                return last;
            }, []);
        };

        var updateFilteredTweets = function() {
            var activeFilters = filters.filter(function(model) {
                return model.get('active');
            });
            var blacklist = activeFilters.map(function(model) {
                return model.get('name');
            });
            var result = tweets.filter(function(model) {
                return blacklist.indexOf(model.getSentimentLabel()) === -1;
            });
            filteredTweets.reset(result);
        };

        /**
         * Logic
         */

        var updateFilteredTweetsWhenNewTweetAdded = function() {
            tweets.on('add', function() {
                var updates = convertTotalsToObjects(tweets.getTotals());
                updates.forEach(function(total) {
                    var filter = filters.findWhere({name: total.name});
                    if (filter) {
                        filter.set('count', total.count);
                        return;
                    }
                    filters.add(total);
                });
                updateFilteredTweets();
            });
        };

        var updateFilteredTweetsWhenFiltersChange = function() {
            filters.on('change', function() {
                updateFilteredTweets();
            });
        };

        /**
         * Module initialisers
         */

        this.addInitializer(function() {
            updateFilteredTweetsWhenNewTweetAdded();
            updateFilteredTweetsWhenFiltersChange();
        });

    });

})(window.app);
