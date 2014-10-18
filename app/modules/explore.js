/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('explore', function(exploreModule, app, Backbone, Marionette, $, _) {

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
