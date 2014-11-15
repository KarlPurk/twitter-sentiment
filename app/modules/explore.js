/* global require */

module.exports = function(options) {

    /***********************************************************
     * Dependencies
     ***********************************************************/

    options = options || {};
    var app = options.app || require('./../app');
    var Marionette = options.marionette || require('backbone.marionette');

    /***********************************************************
     * Views
     ***********************************************************/

    var ExploreView = Marionette.LayoutView.extend({
        template: '#explore-template',
        className: 'main-content transition-hide',
        regions: {
            tweets: '#tweets'
        },
        onShow: function () {
            var TweetsView = app.bus.request('get-view', 'tweet-list', 'tweet-list');
            this.tweets.show(new TweetsView({
                collection: app.bus.request('filtered-tweets')
            }));
        }
    });

    /***********************************************************
     * Public interface
     ***********************************************************/

    app.bus.reply('explore-view', function () {
        return ExploreView;
    });

};