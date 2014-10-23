/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('totals', function(totalsModule, app, Backbone, Marionette, $, _) {

        var TotalsView = Marionette.ItemView.extend({
            className: 'white-box',
            template: '#total-tweets-template',
            initialize: function() {
                this.listenTo(this.collection, "reset", this.render);
            },
            serializeData: function() {
                return this.collection.getTotals();
            }
        });

        app.bus.reply('get-totals-view', function() {
            return TotalsView;
        });

    });




})(window.app);