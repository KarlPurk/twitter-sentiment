/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('dashboard', function(dashboardModule) {

        dashboardModule.reqres = new Backbone.Wreqr.RequestResponse();

        //noinspection JSUnusedGlobalSymbols
        var DashboardView = Marionette.LayoutView.extend({
            template: '#dashboard-template',
            className: 'main-content transition-hide',
            regions: {
                totals: '#totals',
                tweets: '#tweets'
            },
            onShow: function() {
                var TotalsView = app.request('get-view', 'totals', 'totals'),
                    TweetsView = app.request('get-view', 'tweets', 'tweets');
                this.totals.show(new TotalsView({
                    collection: app.request('get-tweets')
                }));
                this.tweets.show(new TweetsView({
                    collection: app.request('get-tweets')
                }));
            }
        });

        dashboardModule.reqres.setHandler('get-dashboard-view', function() {
            return DashboardView;
        });

    });

})(window.app);