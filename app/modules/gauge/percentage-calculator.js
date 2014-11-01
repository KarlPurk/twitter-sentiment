var d3 = require('d3');

/**
 * Calculates the percentage value for the gauge chart
 */
module.exports = (function() {

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

    var calculate = function(total, score) {
        // TODO: remove dependency on d3 for this calculation
        return d3.scale.linear().domain([-total, total]).range([0, 100])(score);
    };

    return function(sentiments) {
        var total = getTotals(sentiments);
        if (total === 0) {
            return;
        }
        var score = getCount(sentiments);
        return calculate(total, score);
    };

}());