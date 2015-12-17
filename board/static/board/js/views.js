define([
	'jquery',
	'backbone',
	'underscore',
	'js/models',
	'js/config'
], function ($, Backbone, _, models, cfg) {
	"use strict";

	var TemplateView = Backbone.View.extend({
		templateName: '',

		initialize: function () {
			this.template = _.template($(this.templateName).html());
		},

		render: function () {
			var context = this.getContext(),
				html = this.template(context);
			this.$el.html(html);
		},

		getContext: function () {
			return {};
		}
	});

	var FormView = TemplateView.extend({
		events: {
			'submit form': 'submit'
		},

		errorTemplate: _.template('<span class="error"><%- msg %></span>'),

		clearErrors: function () {
			$('.error', this.form).remove();
		},

		showErrors: function (errors) {
			_.map(errors, function (fieldErrors, name) {
				var field = $(':input[name="' + name + '"]', this.form);
				var label = $('label[for=' + field.attr('id') + ']', this.form);

				if (label.length === 0) {
					label = $('label', this.form).first();
				}

				function appendError(msg) {
					label.before(this.errorTemplate({msg: msg}));
				}

				_.map(fieldErrors, appendError, this);
			}, this);
		},

		serializeForm: function (form) {
			return _.object(_.map(form.serializeArray(), function (item) {
				return [item.name, item.value];
			}));
		},

		submit: function (ev) {
			ev.preventDefault();
			this.form = $(ev.currentTarget);
			this.clearErrors;
		},

		failure: function (xhr, status, error) {
			var errors = xhr.responseJSON || [{msg: xhr.statusText}];
			this.showErrors(errors);
		},

		done: function (ev) {
			if (ev) {
				ev.preventDefault();
			}

			this.trigger('done');
			this.remove();
		},

		modelFailure: function (xhr, status, error) {
			var errors = xhr.responseJSON || [{msg: xhr.statusText}];
			this.showErrors(errors);
		}
	});

	var HomepageView = TemplateView.extend({
		templateName: "#home-template",

		events: {
			'click button.add': 'renderAddForm'
		},

		initialize: function (options) {
			TemplateView.prototype.initialize.apply(this, arguments);

			models.collections.ready.done(function () {
				var end = new Date();
				end.setDate(end.getDate() - 7);
				end = end.toISOString().replace(/T.*/g, '');

				models.sprints.fetch({
					data: {end_min: end},
					success: $.proxy(this.render, this)
				});

			}, this);
		},

		getContext: function () {
			return {sprints: models.sprints};
		},

		renderAddForm: function (ev) {
			var view = new NewSprintView();
			var link = $(ev.currentTarget);

			ev.preventDefault();
			link.before(view.el);
			link.hide();
			view.render();
			view.on("done", function () {
				link.show();
			})
		}
	});

	var LoginView = FormView.extend({
		id: 'login',
		templateName: '#login-template',

		submit: function (ev) {
			var data = {};

			FormView.prototype.submit.apply(this, arguments);
			data = this.serializeForm(this.form);

			$.post(cfg.apiLogin, data)
				.success($.proxy(this.loginSuccess, this))
				.fail($.proxy(this.failure, this));
		},

		loginSuccess: function (data) {
			models.session.save(data.token);
			this.done();
		}
	});

	var HeaderView = TemplateView.extend({
		tagName: 'header',
		className: 'nav-header',
		templateName: '#header-template',

		events: {
			'click a.logout': 'logout'
		},

		getContext: function () {
			return {authenticated: models.session.authenticated()};
		},

		logout: function (ev) {
			ev.preventDefault();
			models.session.delete();
			window.location = '/';
		}
	});

	var NewSprintView = FormView.extend({
		templateName: '#new-sprint-template',
		className: 'new-sprint',

		events: _.extend(
			{
				'click button.cancel': 'done'
			},
			FormView.prototype.events		// also handle a cancel button to call the done method defined by the FormView.
		),

		submit: function (ev) {
			var attributes = {};

			FormView.prototype.submit.apply(this, arguments);
			attributes = this.serializeForm(this.form);
			models.collections.ready.done($.proxy(function () {
				models.sprints.create(attributes, {
					wait: true,
					success: $.proxy(this.success, this),
					error: $.proxy(this.modelFailure, this)
				});
			}), this);
		},

		success: function (model) {
			this.done();
			window.location.hash = '#sprint/' + model.get('id');
		}
	});

	var SprintView = TemplateView.extend({
		templateName: '#sprint-template',

		initialize: function (options) {
			TemplateView.prototype.initialize.apply(this, arguments);	// call base "class"
			this.sprintId = options.sprintId;
			this.sprint = null;
			var self = this;

			models.collections.ready.done(function () {
				self.sprint = models.sprints.push({id: self.sprintId});	// put current sprint in collection
				self.sprint.fetch({				// SprintModel here
					success: function () {
						self.render();
					}
				});
			});

		},

		getContext: function () {
			return {sprint: this.sprint};
		}
	});

	return {
		HomepageView: HomepageView,
		LoginView: LoginView,
		HeaderView: HeaderView,
		NewSprintView: NewSprintView,
		SprintView: SprintView
	};

});
