var pymChild = new pym.Child;

// Global elements
var $window_width = $(window).width();

var $body = $('body');
var $svg_container = $('#svgs-container');
var $gif = $svg_container.find('#gif');
var $page_one_table = $('#page-1-table');
var $page_one_table_tbody = $page_one_table.find('tbody');
var $key = $('#key');

// Determine what page we're on
function setHash() {
	window.hash_og = window.location.hash;
	window.hash = parseInt(hash_og.match(/#(.*)\-/).pop());
	window.hash_two = parseInt(hash_og.match(/-(.*)/).pop());
}

setHash();

if (hash === 1) {
	window.page_one = true;
}

// Global DOM elements
$body.addClass('page-' + hash);
$body.addClass('page-' + hash + '-' + hash_two);

// Drop it like it's hot
$(document).ready(function() {
	if (page_one) {
		storyOne.docReady();
	}
});