/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({
		
		el: "#book-table",
		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #sort-name': 'sortByName'
		},

		
		initialize: function () {

			this.$list = $('#book-list');
			this.$sortNameAsc = $('#sort-name-asc');
			this.$sortNameDesc = $('#sort-name-desc');

			this.listenTo(app.books, 'reset', this.addAll);
			
			this.isSortByAsc = true;
			this.addAll();
			$('.dropdown-toggle').dropdown(); // this is for fixing bug of bootstrap dropdownlist, it doesn't work after refresh the page.
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			
		},


		addOne: function (book) {
			var view = new app.BookView({ model: book });
			this.$list.append(view.render().el);
		},

		addAll: function () {
			this.$list.html('');
			var self = this;
	  		app.books.fetch({
	  			success: function(collection, response) {
	  				app.books.add(collection.models);
	  				app.books.each(this.addOne, this);
	  			}.bind(self)
	  		});
			
		},
		
		sortByName: function(){
			var comparatorFun;
			this.$sortNameAsc.hide();
			this.$sortNameDesc.hide();
			this.isSortByAsc = !this.isSortByAsc;
			
			var sortDirection = this.isSortByAsc ? 1 : -1;
			comparatorFun =  function(a, b) {
    			return sortDirection * a.get('name').localeCompare(b.get('name'));
  			};
			app.books.comparator = comparatorFun;
			app.books.sort();
			this.isSortByAsc?this.$sortNameAsc.show():this.$sortNameDesc.show();
			this.$list.html('');
			app.books.each(this.addOne, this);
		}
	});
})(jQuery);