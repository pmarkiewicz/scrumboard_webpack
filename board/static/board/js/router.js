define([
	'jquery',
	'backbone',
	'js/views',
	'js/models'
], function ($, Backbone, views, models) {
	"use strict";

	var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'home'
			},

			initialize: function (options) {
				this.contentElement = '#content';
				this.current = null;
				//Backbone.history.start();
			},

			home: function () {
				var view = new views.HomepageView({el: this.contentElement});

				this.render(view);
			},

			route: function (route, name, callback) {
				// Override default route to enforce login on every page
				var login;

				callback = callback || this[name];	// if there is no callback we retrieve one based on name

				callback = _.wrap(callback, function(original_func) {
					var args = _.without(arguments, original_func);	// removes original func from params list

					if (models.session.authenticated()) {
						original_func.apply(this, args);
					}
					else {
						$(this.contentElement).hide();

						login = new views.LoginView();
						$(this.contentElement).after(login.el);

						login.on('done', function() {
							$(this.contentElement).show();
							original_func.apply(this, args);
						});

						login.render();
					}
				});

				return Backbone.Router.prototype.route.apply(this, [route, name, callback]);
			},

			render: function (view) {
				if (this.current) {
					this.current.undelegateEvents();
					this.current.$el = $();
					this.current.remove();
				}

				this.current = view;
				this.current.render();
			}
		})
		;

	return {Router: AppRouter};

});
