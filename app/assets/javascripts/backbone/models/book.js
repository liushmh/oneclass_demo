var app = app || {};

(function () {
	'use strict';

	app.Book = Backbone.Model.extend({
		urlRoot:'books',
		
		defaults: {
			id:0,
		    isbn:'',
			name: '',
			occupied: false
		},

		occupiedBy: function(user) {
			this.save({
				occupied: true
			},{
				wait: true,
  				error: function(){ 
  					window.alert('cannot occupy more than 5 books per day');
  				}
			});
		}, 
		
		returnBy: function(user){
			this.save({
					occupied: false
				},{
					wait: true,
	  				error: function(){ 
	  					window.alert('cannot return book due to server error');
	  				}
				});
		}
	});
	
})();