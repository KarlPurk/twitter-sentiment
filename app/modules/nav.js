/* global Backbone, Marionette */
(function(app) {
    "use strict";

    app.module('nav', function(navModule) {

        var NavView = Marionette.ItemView.extend({
            tagName: 'ul',
            template: '#nav-template',
            className: 'nav nav-pills',
            events: {
                'click .dashboard': 'dashboardButtonClicked',
                'click .explore': 'exploreButtonClicked'
            },
            dashboardButtonClicked: function() {
                this.transitionToView('dashboard', 'dashboard');
            },
            exploreButtonClicked: function() {
                this.transitionToView('explore', 'explore');
            },
            transitionToView: function(module, view) {
                var showView = function(module, view) {
                    app.execute('render-view', module, view);
                    setTimeout(function() {
                        app.getRegion('main').currentView.$el.removeClass('transition-hide');
                    }, 1);
                };
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

        navModule.addInitializer(function() {
            app.getRegion('nav').show(new NavView());
        });

        app.addRegions({nav: 'nav'});
    });

    app.addInitializer(function() {
        app.getRegion('nav').currentView.dashboardButtonClicked();
    });

})(window.app);
