var conditionItemView = Backbone.View.extend( {
	tagName: 'option',
	template: _.template('<option class="list-group-item-action" id="<%= ICD_10 %>">(<%= ICD_10 %>) <%=ICD_10_Description%></option>'),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
	}
}); 