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

			},

			home: function () {
				var view = new views.HomepageView({el: this.contentElement});

				this.render(view);
			},

			route: function (route, name, callback) {
				// Override default route to enforce login on every page
				var login;

				callback = callback || this[name];

				callback = _.wrap(callback, function(original) {
					var args = _.without(arguments, original);

					if (models.session.authenticated()) {
						original.apply(this, args);
					}
					else {
						$(this.contentElement).hide();

						login = new views.LoginView();
						$(this.contentElement).after(login.el);


					}
				});

				return Backbone.Router.prototype.route.apply(this, [route, name, callback]);
			},

			render: function (view) {
				if (this.current) {
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
