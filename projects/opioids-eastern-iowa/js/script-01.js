var storyOne = {
	// Set SVG, projections and load data
	mapRender: function(iteration)  {
		window.map = d3.map();

		// Load two files before rendering to DOM
		queue()
			.defer(d3.json, "json/us-states.json")
			.defer(d3.json, "json/data-1.json")
			.await(function(error, file_one, file_two) {
				if (error) throw error;

				_.each(file_two['states'], function(data, state) {
					window.map.set(state, data[iteration]['aar']);
				});

				storyOne.mapReady(file_one, iteration)
			})
	// Close map render
	},

	// Append map data to DOM
	mapReady: function(us, iteration) {
		var width = 200;
  	var height = 150;

  	// var width = 800;
   //  var height = 600;

    var projection = d3.geo.albersUsa()
			// .scale(1120)
			.scale(280)
			.translate([width / 2, height / 2]);

		var path = d3.geo.path()
			.projection(projection);

		var svgs_container = d3.select("#svgs-container")
		
		// $('.svg-container').hide();
		var container = svgs_container.append('div')
			.attr("class", "svg-container")

		var header = container.append('h4')
			.html(iteration + 1999)
			.style("width", width)

		var svg = container.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("class", "states")
			.selectAll("path")
				.data( topojson.feature(us, us.objects.states).features)
				.enter().append("path")
				.attr("class", "state")
				.attr("fill", function(d) {
					// Determines color of county
					var state = d.properties.name;
					var num = map.get(state);

					return storyOne.setColor(num);
				})
				.attr("d", path)

		// Show note and hide spinner once all maps are on the page
		if (iteration === 15) {
			spinner.stop();

			pymChild.sendHeight();
		}
	// Close map ready
	},

	// Used to set colors on box chart
	colors: function() {
		return [
			'#fff7ec',
			'#fee8c8',
			'#fdd49e',
			'#fdbb84',
			'#fc8d59',
			'#ef6548',
			'#d7301f',
			'#b30000',
			'#7f0000'
		]
	},

	setColor: function(num) {
		var color_code = Math.round(num / 3.2);
    
    if (color_code > 8) {
			color_code = 8;
    }

    return this.colors()[color_code];
	},

	loadData: function(data) {
		if (hash_two === 1) {
      var source = $('#template-state-overdoses').html();
			var handlebarscompile = Handlebars.compile(source);
			var rendered_html = handlebarscompile(data['states']);

			// Put HTML on DOM
			$page_one_table_tbody.append(rendered_html);

			pymChild.sendHeight();
		}
	},

	// Create key on DOM
	createKey: function() {
		var colors = storyOne.colors();
		var colors_length = colors.length;
		var boxes = '';

		for (var num = 0; num < colors_length; num++) {
			var box = '<div style="background-color:' + colors[num] + '"></div>';

			boxes += box;
		}

		$key.find('#boxes').append(boxes);
	},

	docReady: function(state) {
		// Load box chart
		if (hash_two === 1) {
			multiplePages.ajaxLoad(1);
		// Load map
		} else if (hash_two === 2) {

			// Show GIF on mobile
			if ($window_width < 650) {
				spinner.stop();

				// Make sure pym doesn't set height
				// Before GIF is placed on page
				if ($gif.height() < 50) {
					
					var gifInterval = setInterval(function () {
						if ($gif.height() > 50) {
							pymChild.sendHeight();

							clearInterval(gifInterval);
						}
					}, 500)

				} else {
					pymChild.sendHeight();
				}
			} else {
				// Render a map for each year
				for(var num = 0; num < 16; num++) {
					this.mapRender(num);
				}
			}

			// Used for making GIF
			// spinner.stop();
			// var num = 1;

			// function loopMapRender () {
			//   setTimeout(function () {
			// 		num++;
					
			// 		if (num < 16) {
			// 			loopMapRender();
			// 			storyOne.mapRender(num);
			// 		}
			//   }, 800)
			// }

			// loopMapRender();
		}

		if (state !== 'hashchange') {
			this.createKey();
			multiplePages.toggleInit();
		}
	}
}