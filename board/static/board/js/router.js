import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import models from './models.es6';

define([
	'./views.js',
], function (views) {
	"use strict";

	let AppRouter = Backbone.Router.extend({
			routes: {
				'': 'home',
				'sprint/:id': 'sprint'
			},

			initialize: function (options) {
				this.contentElement = '#content';
				this.current = null;
				this.header = new views.HeaderView();
				$('body').prepend(this.header.el);
				this.header.render();
				Backbone.history.start();
			},

			home: function () {
				let view = new views.HomepageView({el: this.contentElement});

				this.render(view);
			},

			sprint: function(id) {
				let view = new views.SprintView({
					el: this.contentElement,
					sprintId: id
				});
				this.render(view);
			},

			route: function (route, name, callback) {
				// Override default route to enforce login on every page
				let login;

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
							this.header.render();
							$(this.contentElement).show();
							original_func.apply(this, args);
						}, this);

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
