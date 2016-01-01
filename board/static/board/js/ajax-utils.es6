import $ from 'jquery';
import Cookies from 'js-cookie';

"use strict";

const csrftoken = Cookies.get('csrftoken');

// TODO: this should be moved to app
// code form djando documentation
function csrfSafeMethod(method) {
	// these HTTP methods do not require CSRF protection
	return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method));
}

// code form djando documentation
function sameOrigin(url) {
	// test that a given url is a same-origin URL
	// url could be relative or scheme relative or absolute
	let host = document.location.host; // host + port
	let protocol = document.location.protocol;
	let sr_origin = '//' + host;
	let origin = protocol + sr_origin;
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
