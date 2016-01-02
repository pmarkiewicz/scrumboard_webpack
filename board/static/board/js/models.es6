import $ from 'jquery';
import Backbone from 'backbone';
import cfg from './config.es6';

"use strict";

let models = {};

let BaseModel = Backbone.Model.extend({
	url: function () {
		let links = this.get('links');
		let url = links && links.self;

		if (!url) {
			url = Backbone.Model.prototype.url.call(this);
		}

		return url;
	}
});

let Session = Backbone.Model.extend({
	defaults: {
		token: null
	},

	initialize: function (options) {
		this.options = options;

		$.ajaxPrefilter($.proxy(this._setupAuth, this));
		this.load();
	},

	load: function () {
		const token = localStorage.apiToken;

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
			const token = this.get('token');
			xhr.setRequestHeader('Authorization', `Token ${token}`);
		}
	}
});

models.session = new Session();

let Sprint = BaseModel.extend({
	fetchTasks: function () {
		let links = this.get("links")
		if (links && links.tasks) {
			models.tasks.fetch({url: links.tasks, remove: false});	// do not remove existing
		}
	}
});

let Task = BaseModel.extend({
	statusClass: function () {
		const sprint = this.get('sprint'),
			  status_id = this.get('status');
		let status;

		if (!sprint) {
			status = 'unassigned';
		}
		else {
			status = ['todo', 'active', 'testing', 'done'][status_id - 1];
		}

		return status;
	},

	inBacklog: function () {
		//  determines what it means for the task to be on the backlog
		return !this.get('sprint');
	},

	inSprint: function (sprint) {
		// determines if the task is in the given sprint
		return sprint.get('id') == this.get('sprint');
	}
});

models.models = {
	Sprint: Sprint,
	Task: Task,
	User: BaseModel.extend({
		idAttributemodel: 'username'
	})
};

let BaseCollection = Backbone.Collection.extend({
	initialize: function (options) {
		console.log('init', this.url);
	},

	parse: function (response) {
		this._next = response.next;
		this._prev = response.previous;
		this._count = response.count;
		return response || [];
	},

	getOrFetch: function (id) {
		let promise = new $.Deferred();
		let model = this.get(id);

		if (model) {
			promise.resolve(model);			// call all attached callbacks
			console.log('model resolved');

			return new $.Deferred().resolve(model);
		}
		else {
			model = this.push({id: id});
			model.fetch()// we cannot return promise from fetch as we will get obj returned from ajax call, not model
				.done(function () {
					console.log('model resolved (async)');
					promise.resolve(model);
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
						console.log('model rejected (async)');
						promise.reject(model, textStatus);
					}
				);
		}

		return promise;
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
		url: data.tasks,

		getBacklog: function () {
			this.fetch({remove: false, data: {backlog: 'True'}});	// filter
		}
	});

	models.tasks = new models.collections.Tasks();

	models.collections.Users = BaseCollection.extend({
		model: models.models.User,
		url: data.users
	});

	models.users = new models.collections.Users();
});

export { models as default };

