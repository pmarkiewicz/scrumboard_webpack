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
				var field = $(':input[name=' + name + ']', this.form);
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

		done: function(ev) {
			if (ev) {
				ev.preventDefault();
			}

			this.trigger('done');
			this.remove();
		}
	});

	var HomepageView = TemplateView.extend({
		templateName: "#home-template"
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

		getContext: function() {
			return {authenticated: models.session.authenticated()};
		},

		logout: function(ev) {
			ev.preventDefault();
			models.session.delete();
			window.location = '/';
		}
	});

	return {HomepageView: HomepageView, LoginView: LoginView, HeaderView: HeaderView};

});
