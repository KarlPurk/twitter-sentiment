/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('totals', function() {

        this.bus = _.extend({}, Backbone.Radio.Requests);

        var TotalsView = Marionette.ItemView.extend({
            className: 'white-box',
            template: '#total-tweets-template',
            initialize: function() {
                this.listenTo(this.collection, "add", this.render);
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