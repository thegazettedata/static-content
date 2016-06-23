$.fn.classList = function() {
	return this[0].className.split(/\s+/);
}

// DOM information for each template on the page
var templatesInfo = [
	{
		'dom': '#timeline-container tr',
		'template': '#timeline-template'
	},{
		'dom': '#timeline-container tr',
		'template': '#timeline-template'
	}
]

// Sets styles for story we're currently on
function hashAction() {
	var hash_num = window.location.hash.replace('#','');

	$('.link-container-' + hash_num).addClass('hash');
	$('.headline-text-' + hash_num).addClass('hash');

	var text = '<div class="hash-headline">Currently reading:</div>';
	$('.headline-text-' + hash_num + ' h3').prepend(text);

	$('a').click(function(e) {
		var target = $(e.target);

		var hash_link = $(target).parents('.link-container').hasClass('hash');
		var hash_headline = $(target).parents('.headline-text').hasClass('hash');

		if (hash_link || hash_headline) {
			e.preventDefault();
		}
	})
// Close hash action
}

// All the page's events
function timelineEvents() {
	var timeline_circle_text = $('.timeline-circle .text');
	var timeline_circle_svg = $('.timeline-circle .text svg');
	var circle_elements = [timeline_circle_text, timeline_circle_svg];


	_.each(circle_elements, function(val, num) {
		// Darken color
		$(val).mouseover(function(e) {
			var target = $(e.target);
			
			var circle = $(target).closest('.timeline-circle');
			var circle_class = '.' + $(circle).classList()[1];

			// Don't activate disable buttons
			if ( $(circle).css('border') !== '5px solid rgb(153, 153, 153)' ) {
				$(circle_class).addClass('active');
			}
		});

		// Lighten color
		$(val).mouseout(function(e) {
			var target = $(e.target);

			$('.timeline-circle').removeClass('active');
		});
	});

	// GA analytics
	$('.headline-text a').click(function(e) {
		var class_name = $(e.target).parents('.headline-text').classList()[1];
		var story_num = parseInt(class_name.replace('headline-text-','')) + 1;

		ga('send', 'event', project_name, 'Story ' + story_num + ' clicked');
	});

	$('.circle-td a').click(function(e) {
		var class_name = $(e.target).parents('.link-container').classList()[1];
		var story_num = parseInt(class_name.replace('link-container-','')) + 1;

		ga('send', 'event', project_name, 'Story ' + story_num + ' clicked');
	});
	
	hashAction();

// Close events
}

// All the page's templates
var handlebars_iteration = 0;

function handlebarsTemplates() {
	// We have an object for each template
	// We want to put on the page
	_.each(templatesInfo, function(val, num) {
		var source = $(val['template']).html();
		var handlebarscompile = Handlebars.compile(source, {'iteration': num});

		// Put HTML on DOM
		handlebars_iteration = num;
		$( val['dom'] ).append( handlebarscompile(data) );
	
	// Close each
	});

	timelineEvents();

// Close templates
}

// Hide stories in series depending on what day it is
function hideStories() {
	var stories_to_hide = [1, 2, 3];

	// Determine the date so we can hide stories
	var now = moment();
	console.log(now);
	console.log(now.isAfter('2016-06-19'))

	if ( now.isSameOrAfter('2016-06-12') ) {
		stories_to_hide = [2, 3];

		$('.timeline-bar.grey-color').css({
    	'height': '400px',
    	'margin-top': '201px'
		});
	}

	if ( now.isAfter('2016-06-19') ) {
		stories_to_hide = [3];

		$('.timeline-bar.grey-color').css({
    	'height': '200px',
    	'margin-top': '401px'
		});
	}

	if ( now.isAfter('2016-06-26') ) {
		stories_to_hide = [];

		$('.timeline-bar.grey-color').hide();
	}

	// Hide appropriate stories
	_.each(stories_to_hide, function(num) {
		$('.link-container-' + num).addClass('inactive');
		$('.headline-text-' + num).addClass('inactive');

		$('.inactive a').click(function(e) {
			e.preventDefault();
		});
	});
}

// Drop it like it's hot
$(document).ready(function() {
	handlebarsTemplates();

	hideStories();

	var pymChild = new pym.Child();
	spinner.stop();
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-30416-68', 'auto');
ga('require', 'displayfeatures');
// ga('send', 'pageview');