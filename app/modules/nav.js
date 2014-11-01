/* global require */

/***********************************************************
 * Dependencies
 ***********************************************************/

var app = require('./../app');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

/***********************************************************
 * Configuration
 ***********************************************************/

var items = [
    {
        name: 'dashboard',
        label: 'Dashboard',
        active: true
    },
    {
        name: 'explore',
        label: 'Explore'
    }
];

/***********************************************************
 * Models
 ***********************************************************/

var NavItem = Backbone.Model.extend({
    defaults: {
        active: false
    }
});

/***********************************************************
 * Collections
 ***********************************************************/

var NavItemCollection = Backbone.Collection.extend({
    model: NavItem,
    refreshActiveProperties: function(name) {
        var model = this.findWhere({name: name});
        var items = this.filter(function(item) {
            return model !== item;
        });
        _.invoke(items, 'set', 'active', false);
    }
});

/***********************************************************
 * Views
 ***********************************************************/

var NavItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#nav-item-template',
    events: {
        'click': 'onClick'
    },
    attributes: function() {
        var getClassName = function (model) {
            return [model.get('name'), model.get('active') ? 'active' : ''].join(' ');
        };
        return {
            class: getClassName(this.model)
        };
    },
    onClick: function(event) {
        event.preventDefault();
        this.model.set('active', true);
    },
    refreshAttributes: function() {
        this.$el.attr(this.attributes());
    }
});

var NavView = Marionette.CompositeView.extend({
    tagName: 'ul',
    template: '#nav-template',
    className: 'nav nav-pills',
    childView: NavItemView,
    events: {
        'click .dashboard': 'dashboardButtonClicked',
        'click .explore': 'exploreButtonClicked'
    },
    dashboardButtonClicked: function() {
        this.buttonClicked('dashboard');
    },
    exploreButtonClicked: function() {
        this.buttonClicked('explore');
    },
    buttonClicked: function(name) {
        this.collection.refreshActiveProperties(name);
        this.children.invoke('refreshAttributes');
        this.transitionToView(name, name);
    },
    transitionToView: function(module, view) {
        var showView = function(module, view) {
            /**
             * Render the view, placing it in the DOM.
             * Then remove the transition-hide class causing
             * the view content to fade in
             */
            app.bus.command('render-view', module, view);
            setTimeout(function() {
                app.getRegion('main').currentView.$el.removeClass('transition-hide');
            }, 1);
        };
        /**
         * If there's an existing view, add the transition-hide class
         * to the view - causing the view to fade out.  When the
         * fade out transition ends we show the new view by calling
         * the showView method..
         */
        if (app.getRegion('main').currentView) {
            app.getRegion('main').currentView.$el.addClass('transition-hide');
            app.getRegion('main').currentView.$el.on('transitionend', function(){
                showView(module, view);
            });
            return;
        }
        showView(module, view);
    }
});

/***********************************************************
 * Module initializers
 ***********************************************************/

app.addInitializer(function() {
    var collection = new NavItemCollection();
    collection.add(items);
    app.getRegion('nav').show(new NavView({
        collection: collection
    }));
});

app.addRegions({nav: 'nav'});

app.addInitializer(function() {
    app.getRegion('nav').currentView.dashboardButtonClicked();
});