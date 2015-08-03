var app = app || {};

(function ($) {
	'use strict';

	// Todo Item View
	// --------------
	_.templateSettings = {
    	interpolate: /\{\{(.+?)\}\}/g
    	
	};
	// The DOM element for a todo item...
	app.BookView = Backbone.View.extend({

		tagName:  'tr',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .occupiedBy': 'occupiedBy',
			'click .returnBy': 'returnBy'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			
			this.$occupyBtn = this.$el.children('td.occupiedBy');
			this.$returnBtn = this.$el.children('td.returnBy');
		},

		// Re-render the titles of the todo item.
		render: function () {

			if (this.model.changed.id !== undefined) {
				return;
			}
			var isOccupied = this.model.get('occupied');
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('occupied', isOccupied);
			
			var occupyBtn = this.$('.occupiedBy');
			var returnBtn = this.$('.returnBy');
			occupyBtn.hide();
			returnBtn.hide();
			isOccupied ? returnBtn.show() : occupyBtn.show();
			// this.$el.toggleClass('occupied', this.model.get('occupied'));
			
			
			return this;
		},

		// Toggle the `"occupied"` state of the model.
		occupiedBy: function () {
			this.model.occupiedBy(app.user);
		}, 
		returnBy: function(){
			this.model.returnBy(app.user);
		}
	});
})(jQuery);