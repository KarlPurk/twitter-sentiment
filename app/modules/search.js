/* global app, Backbone, Marionette, $, _ */
(function(app) {
    "use strict";

    app.module('search', function(searchModule, app, Backbone, Marionette, $, _) {

        this.bus = _.extend({}, Backbone.Events);
        this.bus = _.extend(this.bus, Backbone.Radio.Requests);

        var SearchView = Marionette.ItemView.extend({
            className: 'search-container  white-box',
            template: '#search-template',
            searchQuery: '',
            ui: {
                form: 'form',
                query: 'input',
                button: 'button',
                message: 'p'
            },
            serializeData: function() {
                return {
                    query: this.searchQuery
                };
            },
            events: {
                'click @ui.button': 'onSearch'
            },
            onShow: function() {
                this.ui.message.hide();
            },
            onSearch: function(event) {
                event.preventDefault();
                this.searchQuery = this.ui.query.val();
                this.render();
                this.ui.form.hide();
                this.ui.message.show();
                searchModule.bus.trigger('search', this.searchQuery);
            }
        });

        this.bus.on('search', function(query) {
            app.bus.trigger('search', query);
        });

        this.bus.reply('get-search-view', function() {
            return SearchView;
        });



    });

})(window.app);