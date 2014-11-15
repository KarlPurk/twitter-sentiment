/* global require */

module.exports = function(options) {

    /***********************************************************
     * Dependencies
     ***********************************************************/

    options = options || {};
    var app = options.app || require('./../app');
    var Marionette = options.marionette || require('backbone.marionette');

    /***********************************************************
     * Views
     ***********************************************************/
    var SearchView = Marionette.ItemView.extend({
        className: 'search-container  widget',
        template: '#search-template',
        searchQuery: '',
        ui: {
            form: 'form',
            query: 'input',
            button: 'button',
            message: 'p'
        },
        serializeData: function () {
            return {
                query: this.searchQuery
            };
        },
        events: {
            'click @ui.button': 'onSearch'
        },
        onShow: function () {
            this.ui.message.hide();
        },
        onSearch: function (event) {
            event.preventDefault();
            this.searchQuery = this.ui.query.val();
            this.render();
            this.ui.form.hide();
            this.ui.message.show();
            app.bus.trigger('search', this.searchQuery);
        }
    });

    /***********************************************************
     * Public interface
     ***********************************************************/

    app.bus.reply('search-view', function () {
        return SearchView;
    });

};