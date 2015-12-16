define([
	'jquery',
	'backbone',
	'js/config',
], function ($, Backbone, cfg) {
	"use strict";

	var models = {};

	var BaseModel = Backbone.Model.extend({
		url: function () {
			var links = this.get('links');
			var url = links && links.self;

			if (!url) {
				url = Backbone.Model.prototype.url.call(this);
			}

			return url;
		}
	});

	var Session = Backbone.Model.extend({
		defaults: {
			token: null
		},

		initialize: function (options) {
			this.options = options;

			$.ajaxPrefilter($.proxy(this._setupAuth, this));
			this.load();
		},

		load: function () {
			var token = localStorage.apiToken;

			if (token) {
				this.set('token', token);
			}
		},

		save: function (token) {
			this.set('token', token);

			if (token === null) {
				localStorage.removeItem('apiToken');
			}
			else {
				localStorage.apiToken = token;
			}
		},

		delete: function () {
			this.save(null);
		},

		authenticated: function () {
			return this.get('token') !== null;
		},

		_setupAuth: function (settings, originalOptions, xhr) {
			if (this.authenticated()) {
				xhr.setRequestHeader('Authorization', 'Token ' + this.get('token'));
			}
		}
	});

	models.session = new Session();

	models.models = {
		Sprint: BaseModel.extend({}),
		Task: BaseModel.extend({}),
		User: BaseModel.extend({
			idAttributemodel: 'username'
		}),
	};

	var BaseCollection = Backbone.Collection.extend({
		initialize: function (options) {
			console.log('init', this.url);
		},

		parse: function (response) {
			this._next = response.next;
			this._prev = response.previous;
			this._count = response.count;
			return response.result || [];
		}
	});

	models.collections = {};
	models.collections.ready = $.getJSON(cfg.apiRoot);	// load configuration of urls
	models.collections.ready.done(function (data) {
		models.collections.Sprints = BaseCollection.extend({
			model: models.models.Sprint,
			url: data.sprints
		});

		models.sprints = new models.collections.Sprints();

		models.collections.Tasks = BaseCollection.extend({
			model: models.models.Task,
			url: data.tasks
		});

		models.tasks = new models.collections.Tasks();

		models.collections.Users = BaseCollection.extend({
			model: models.models.User,
			url: data.users
		});

		models.users = new models.collections.Users();
	});

	return models;
});
