/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var Marionette = require('backbone.marionette');

/**
 * Calculates the percentage value for the gauge chart
 */
var gaugePercentageCalculator = (function() {

    var getTotals = function(sentiments) {
        return sentiments.reduce(function(total, sentiment) {
            if (['positive', 'negative'].indexOf(sentiment.get('name')) === -1) {
                return total;
            }
            return total + sentiment.get('count');
        }, 0);
    };

    var getCount = function(sentiments) {
        var count = 0;
        var strategies = {
            positive: function(total, count) { return total + count; },
            negative: function(total, count) { return total - count; }
        };
        sentiments.forEach(function(sentiment) {
            if (['positive', 'negative'].indexOf(sentiment.get('name')) === -1) {
                return;
            }
            count = strategies[sentiment.get('name')](count, sentiment.get('count'));
        });
        return count;
    };

    var calculateGaugePercentage = function(total, score) {
        return d3.scale.linear().domain([-total, total]).range([0, 100])(score);
    };

    return function(sentiments) {
        var total = getTotals(sentiments);
        if (total === 0) {
            return;
        }
        var score = getCount(sentiments);
        return calculateGaugePercentage(total, score);
    };

}());

//noinspection JSUnusedGlobalSymbols
/***********************************************************
 * Views
 ***********************************************************/

var GaugeView = Marionette.ItemView.extend({
    template: '#gauge-template',
    className: 'gauge white-box',
    chart: null,
    collection: null,

    initialize: function() {
        //noinspection JSUnresolvedFunction
        this.listenTo(this.collection, 'add', this.updateGauge, this);
        //noinspection JSUnresolvedFunction
        this.listenTo(this.collection, 'change:count', this.updateGauge, this);
    },

    onShow: function() {
        this.addChart();
        this.updateGauge();
    },

    addChart: function() {
        //noinspection JSUnusedGlobalSymbols
        this.chart = c3.generate({
            data: {
                columns: [
                    ['sentiment', 50]
                ],
                type: 'gauge'
            },
            gauge: {
                label: {
                    format: function() {
                        return '';
                    },
                    show: false
                }
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
                threshold: {
                    values: [30, 60, 90, 100]
                }
            }
        });

        // HACK: Find out how to deal with this properly
        this.$el.find('svg').attr('height', '200px');
    },

    updateGauge: function() {
        var percentage = gaugePercentageCalculator(this.collection);
        percentage = percentage === undefined ? 50 : percentage;
        this.chart.load({
            columns: [
                ['sentiment', percentage]
            ]
        });
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('get-gauge-view', function() {
    return GaugeView;
});