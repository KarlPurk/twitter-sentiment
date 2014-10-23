/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('totals', function(totalsModule, app, Backbone, Marionette, $, _) {

        this.bus = _.extend({}, Backbone.Radio.Requests);

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

        this.bus.reply('get-totals-view', function() {
            return TotalsView;
        });

    });




})(window.app);