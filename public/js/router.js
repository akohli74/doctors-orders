var Conditions = Backbone.Collection.extend({});
var router = Backbone.Router.extend( {
	routes: {
		'': 'reviewehr',
	},
	initialize: function() {
		var _this = this;
		$.ajax({
				method: "GET",
				url: "http://localhost:3000/conditions"
			})
			.fail(function(xhr, err) {
				console.log(err);
			})
			.done(function( icd10_conditions ) {
				var conditions = new Conditions();
				conditions.reset(icd10_conditions);

				_this.conditionsView = new conditionsView({collection: conditions});
				_this.conditionsView.render();
			});

		this.ehrView = new ehrView();

	},
	reviewehr: function() {
		this.ehrView.render();
	}
});
