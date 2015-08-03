var app = app || {};

(function () {
	'use strict';


	var Books = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Book,

		// Books are sorted by their name.
		comparator: 'name'
	});

	
	app.books = new Books();
	app.books.url = "books.json";
})();