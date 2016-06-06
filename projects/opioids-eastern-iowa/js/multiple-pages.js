var multiplePages = {
	// Toggle buttons
	toggleView: function() {
		$('.toggle-view').click(function(e) {
			var target = e.target;
			$(target).addClass('selected');
			$(target).siblings().removeClass('selected');
		});
	},

	// Ran when a toggle button is clicked
	hashChange: function() {
  	$(window).on('hashchange', function() {
	  	// Hide this stuff until we're done loading content
	  	spinner.spin(target);

	  	// Set global hash variables
	  	setHash();

	  	// Remove content and reload
	  	if (page_one) {
	  		if ($window_width > 650) {
	  			$svg_container.html('');
	  		} else if (hash_two === 1) {
	  			$gif.hide();
	  		} else {
	  			$gif.show();
	  		}

	  		$page_one_table_tbody.html('');

	  		storyOne.docReady('hashchange');
			}

			// Remove old body classes
			// And add new ones
			$body.removeClass();
			$body.addClass('page-' + hash);
			$body.addClass('page-' + hash + '-' + hash_two);
		});
	// Hash change
	},

	// All of our toggle button events
	toggleInit: function() {
		this.toggleView();
		this.hashChange();
	},

	ajaxLoad: function(page) {
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: 'json/data-' + page + '.json',
			dataType: 'json',
			success: function (data) {
				if (page_one) {
					storyOne.loadData(data);
				}

				spinner.stop();
			}
    });
	// Close ajax load
	}
}