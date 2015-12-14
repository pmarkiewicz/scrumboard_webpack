define([
	'jquery',
	'backbone',
	'js/config',
	'vendor/js.cookie'
], function ($, Backbone, cfg, Cookies) {
	"use strict";

	var csrftoken = Cookies.get('csrftoken');

	// code form djando documentation
	function csrfSafeMethod(method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method));
	}

	// code form djando documentation
	function sameOrigin(url) {
		// test that a given url is a same-origin URL
		// url could be relative or scheme relative or absolute
		var host = document.location.host; // host + port
		var protocol = document.location.protocol;
		var sr_origin = '//' + host;
		var origin = protocol + sr_origin;
		// Allow absolute or scheme relative URLs to same origin
		return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
			(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
				// or any other URL that isn't scheme relative or absolute i.e relative.
			!(/^(\/\/|http:|https:).*/.test(url));
	}

	$.ajaxPrefilter(function (settings, originalOptions, xhr) {
		if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
			// Send the token to same-origin, relative URLs only.
			// Send the token only if the method warrants CSRF protection
			// Using the CSRFToken value acquired earlier
			xhr.setRequestHeader('X-CSRFToken', csrftoken);
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

	var Sprint = Backbone.Model.extend({});
	var Task = Backbone.Model.extend({});
	var User = Backbone.Model.extend({});

	var Sprints = Backbone.Collection.extend({
		model: Sprint,
		url: cfg.sprints
	});

	var sprints = new Sprints();

	var Tasks = Backbone.Collection.extend({
		model: Task,
		url: cfg.tasks
	});

	var tasks = new Tasks();

	var Users = Backbone.Collection.extend({
		model: User,
		url: cfg.users
	});

	var users = new Users();

	return {
		session: new Session(),
		models: {
			Sprint: Sprint,
			Task: Task,
			User: User
		},
		collections: {
			sprints: sprints,
			tasks: tasks,
			users: users
		}
	};
});
