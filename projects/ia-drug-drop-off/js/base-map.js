// Set view of Leaflet map based on screen size
var layer = new L.StamenTileLayer('terrain');
var map = new L.Map('map', {
	center: new L.LatLng(42.5,-93.3),
	minZoom: 4,
	zoom: 6,
	keyboard: false,
	boxZoom: false,
	doubleClickZoom: false,
	scrollWheelZoom: false,
	maxBounds: [[33.154799,-116.586914],[50.190089,-77.563477]]
});
map.addLayer(layer);

// Set mobile view of map
if ($(window).width() < 601) {
	map.setView([41.5,-93.5],6);
}