var app = app || {};

(function () {
	'use strict';

	var Users = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.User
	});

	app.users = new Users();
})();