var storyOne = {
	functionGoesHere: function() {
		console.log('load worked!')
	},

	docReady: function() {
		this.functionGoesHere();
	}
}