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
			this.clearErrors();
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
			var self = this;

			models.collections.ready.done(function () {
				var end = new Date();
				end.setDate(end.getDate() - 7);
				end = end.toISOString().replace(/T.*/g, '');

				models.sprints
					.fetch({
						data: {end_min: end},
					})
					.done(function () {
						self.render();
					});

			});
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
			this.tasks = [];
			var self = this;

			this.statuses = {
				unassigned: new StatusView({sprint: null, status: 1, title: 'Backlog'}),
				todo: new StatusView({sprint: this.sprintId, status: 1, title: 'Not Started'}),
				active: new StatusView({sprint: this.sprintId, status: 2, title: 'In Development'}),
				testing: new StatusView({sprint: this.sprintId, status: 3, title: 'In Testing'}),
				done: new StatusView({sprint: this.sprintId, status: 4, title: 'Completed'})
			};
			models.collections.ready.done(function () {
				/*
				 self.sprint = models.sprints.push({id: self.sprintId});	// put current sprint in collection
				 self.sprint.fetch().done(function () {
				 self.render();
				 }
				 );
				 */
				models.tasks.on("add", self.addTask, self);

				models.sprints.getOrFetch(self.sprintId)
					.done(function (sprint) {
						self.sprint = sprint;
						self.render();
						// Add any current tasks
						models.tasks.each(self.addTask, self);
						// Fetch tasks for the current sprint
						sprint.fetchTasks();
					})
					.fail(function (sprint) {
						self.sprint = sprint;
						self.sprint.invalid = true;
						self.render();
					});

					// Fetch unassigned tasks
					models.tasks.getBacklog();
			});
		},

		getContext: function () {
			return {sprint: this.sprint};
		},

		render: function () {
			TemplateView.prototype.render.apply(this, arguments);

			_.each(this.statuses, function (view, name) {
				$('.tasks', this.$el).append(view.el);
				view.delegateEvents();
				view.render();
			}, this);

			_.each(this.tasks, function(task) {
				this.renderTask(task);
			}, this);
		},

		addTask: function(task) {
			if (task.inBacklog() || task.inSprint(this.sprint)) {
				this.tasks[task.get("id")] = task;	// arrays in js can have gaps, they are not contignous
				this.renderTask(task);
			}
		},

		renderTask: function(task) {
			var column = task.statusClass(),
				container = this.statuses[column],
				html = _.template('<div><%- task.get("name") %></div>');

			$('.list', container.$el).append(html({task: task}));
		}
	});

	var StatusView = TemplateView.extend({
		tagName: 'section',
		className: 'status',
		templateName: '#status-template',
		initialize: function (options) {
			TemplateView.prototype.initialize.apply(this, arguments);
			this.sprint = options.sprint;
			this.status = options.status;
			this.title = options.title;
		},
		getContext: function () {
			return {sprint: this.sprint, title: this.title};
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
