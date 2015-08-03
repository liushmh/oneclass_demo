var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.User = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			id:0,
			name: '',
			admin: false
		}, 
		canOccupyBook: function()
		{
		    return this.get("admin");
		}
	});
})();