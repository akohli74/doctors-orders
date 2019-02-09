var conditionsView = Backbone.View.extend( {
	el: "#condition-list-group",
	render: function() {
		view = this;
		this.collection.each(function(condition) {
			var conditionSubView = new conditionItemView({model: condition});
			conditionSubView.render();

			$('.list-group').append(conditionSubView.$el);
		});
	}
})