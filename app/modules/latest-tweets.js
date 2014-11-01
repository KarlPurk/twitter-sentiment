/* globals require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var _= require('underscore');
var Marionette = require('backbone.marionette');
var TweetCollection = app.bus.request('tweets-collection');
var tweets = app.bus.request('tweets');

/***********************************************************
 * Collections
 ***********************************************************/

var latestTweets = new TweetCollection();

tweets.on('add', function(tweet) {
    if (latestTweets.length === 5) {
        latestTweets.remove(latestTweets.at(latestTweets.length - 1));
    }
    latestTweets.unshift(tweet);
});

/***********************************************************
 * Views
 ***********************************************************/

var TweetView = Marionette.ItemView.extend({
    tagName: 'div',
    template: "#latest-tweets-item-template",
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
    },
    classNameMap: {
        positive: 'alert-success',
        negative: 'alert-danger',
        mixed: 'alert-warning',
        neutral: 'alert-info'
    },
    attributes: function() {
        return {
            class: this.getClassName(this.model)
        };
    },
    getClassName: function (model) {
        var getClassNameBySentiment = function(model) {
            return this.classNameMap[model.get('sentiment').type];
        }.bind(this);
        return ['alert', getClassNameBySentiment(model)].join(' ');
    }
});

var LatestTweetsView = Marionette.CompositeView.extend({
    template: '#latest-tweets-template',
    className: 'main-content white-box',
    childView: TweetView,
    childViewContainer: '.latest-tweets'
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('latest-tweets-view', function() {
    return LatestTweetsView;
});

app.bus.reply('latest-tweets', function() {
    return latestTweets;
});