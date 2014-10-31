/* global require */

var app = require('./../app');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Views
 ***********************************************************/
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
        app.bus.trigger('search', this.searchQuery);
    }
});

/***********************************************************
 * Public interface
 ***********************************************************/

app.bus.reply('get-search-view', function() {
    return SearchView;
});