/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('dashboard', function(dashboardModule, app, Backbone, Marionette, $, _) {

        //noinspection JSUnusedGlobalSymbols
        var DashboardView = Marionette.LayoutView.extend({
            template: '#dashboard-template',
            className: 'main-content transition-hide',
            regions: {
                totals: '#totals',
                tweets: '#tweets',
                search: '#search'
            },
            onShow: function() {
                var TotalsView = app.bus.request('get-view', 'totals', 'totals'),
                    TweetsView = app.bus.request('get-view', 'tweets', 'tweets'),
                    SearchView = app.bus.request('get-view', 'search', 'search');
                this.totals.show(new TotalsView({
                    collection: app.bus.request('get-filtered-tweets')
                }));
                this.tweets.show(new TweetsView({
                    collection: app.bus.request('get-filtered-tweets')
                }));
                this.search.show(new SearchView());
            }
        });

        app.bus.reply('get-dashboard-view', function() {
            return DashboardView;
        });

    });

})(window.app);