/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('explore', function() {

        this.bus = _.extend({}, Backbone.Radio.Requests);

        var ExploreView = Marionette.LayoutView.extend({
            template: '#explore-template',
            className: 'main-content transition-hide',
            regions: {
                tweets: '#tweets'
            }
        });

        this.bus.reply('get-explore-view', function() {
            return ExploreView;
        });

    });

})(window.app);
