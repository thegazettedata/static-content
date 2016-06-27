function latlngSwitch(latlng) {
	var lat = latlng[1];
	var lng = latlng[0];

	return lat + ', ' + lng
}
function iconClick() {
	$('#results-container table .icon .fa-map-marker').click(function(e) {
		var target = e.target;
		var latlng = $(target).attr('data-latlng').split(',');
		console.log(latlng);

		map.setView([latlng[1], latlng[0]], 15);

		$('html,body').animate({ scrollTop: 0 }, 500); 
	});
}

function nearestNeighbor(latlng) {
	var nearest_array = leafletKnn(geojson).nearest(latlng);

	var source = $('#results-template').html();
	var handlebarscompile = Handlebars.compile(source);
	$('#results-container').append( handlebarscompile(nearest_array) );

	iconClick();

	$('#footer-base').css({
		'position': 'relative'
	});
	$('#drop-off-sites-container').show();
	$('#initial-container').hide();

	pymChild.sendHeight();
// Close nearest neighbor
}

// Geojson: Drop off sites
var geojsonMarkerOptions = {
	radius: 8,
	fillColor: "#fc2836",
	color: "#FFF",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 1,
		fillColor: '#FFF',
		color: '#333',
		fillOpacity: 1
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
}

var geojson = L.geoJson(locations, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, geojsonMarkerOptions);
	},
	onEachFeature: function (feature, layer) {
		var popup_html = '<h5>' + feature.properties.Name + '</h5>';
		popup_html += '<a href="https://www.google.com/maps?daddr=';
		popup_html += latlngSwitch(feature.geometry.coordinates);
		popup_html += '&ll" target="_blank">'
		popup_html += '<div>' + feature.properties.Address + '</div>';
		if (feature.properties.Address2) {
			popup_html += '<div>' + feature.properties.Address2 + '</div>';
		}
		popup_html += '</a>';
		popup_html += '<div>' + feature.properties.City + ', Iowa</div>';
		popup_html += '<div>' + feature.properties.Zip + '</div>';
		layer.bindPopup(popup_html);

		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
    });
  }
}).addTo(map);

function resetHighlight(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 1,
		fillColor: "#fc2836",
		color: "#FFF",
		fillOpacity: 0.8
	});
}

// Location control
var location_control = L.control.locate({
	locateOptions: {
		maxZoom: 13
	},
	drawCircle: false,
	markerClass: L.Marker,
	markerStyle: false
});

location_control.addTo(map);

// Drop it like it's hot
$(document).ready(function() {
	var address_html = '<span class="address">Look up your address</span>';
	$('.leaflet-control-locate a').prepend(address_html);
		
	pymChild = new pym.Child();

	spinner.stop();
});