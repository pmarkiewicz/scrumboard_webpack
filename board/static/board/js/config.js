define([
	'jquery'
], function($) {
	"use strict";

	var config = $('#config');
	var cfg = JSON.parse(config.text());

	return {cfg: cfg};
});
