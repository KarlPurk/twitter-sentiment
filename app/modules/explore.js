/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('explore', function(exploreModule) {

        exploreModule.reqres = new Backbone.Wreqr.RequestResponse();

        var ExploreView = Marionette.LayoutView.extend({
            template: '#explore-template',
            className: 'main-content transition-hide',
            regions: {
                tweets: '#tweets'
            }
        });

        exploreModule.reqres.setHandler('get-explore-view', function() {
            return ExploreView;
        });

    });

})(window.app);
