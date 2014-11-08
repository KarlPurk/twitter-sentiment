/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Views
 ***********************************************************/

var TweetView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#tweet-template",
    templateHelpers: {
        getSentimentClass: function() {
            if (this.sentiment.mixed) {
                return 'label-warning';
            }
            else if (this.sentiment.type === 'positive') {
                return 'label-success';
            }
            else if (this.sentiment.type === 'negative') {
                return 'label-danger';
            }
            return 'label-info';
        },
        getSentimentLabel: function() {
            if (this.sentiment.mixed) {
                return 'mixed';
            }
            return this.sentiment.type;
        }
    }
});

var TweetsView = Marionette.CompositeView.extend({
    template: "#tweets-template",
    childView: TweetView,
    childViewContainer: 'tbody',
    collectionEvents: {
        'reset': 'onReset'
    },
    onReset: function () {
        this.render();
    }
});

var LayoutView = Marionette.LayoutView.extend({
    template: '#tweets-layout-template',
    className: 'main-content widget',
    regions: {
        filters: '.options',
        tweets: '.tweets'
    },
    onShow: function() {
        this.getRegion('tweets').show(new TweetsView({
            collection: this.collection
        }));

        var FiltersView = app.bus.request('tweet-filters-view');

        this.getRegion('filters').show(new FiltersView());
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('tweet-list-view', function() {
    return LayoutView;
});