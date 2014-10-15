/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('totals', function(totalsModule) {

        totalsModule.reqres = new Backbone.Wreqr.RequestResponse();

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

        totalsModule.reqres.setHandler('get-totals-view', function() {
            return TotalsView;
        });

    });

})(window.app);