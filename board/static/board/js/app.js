require.config({
	baseUrl: "/static/board/",
	paths: {
		jquery: 'vendor/jquery-2.1.4',
		underscore: 'vendor/underscore',
		backbone: 'vendor/backbone'
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});


require([
	'backbone',
	'js/router'
], function(Backbone, router) {
	"use strict";

	var router = new router.Router();
	Backbone.history.start();
});
