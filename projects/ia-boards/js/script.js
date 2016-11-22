var parties = count[0]

_.each(parties, function(val, party) {
	var comm_members = parseInt(val);
	var comm_html = '';

	// Create box for each committee member
	for (i = 0; i < comm_members; i++) {
		var icon = 'fa-user'

		comm_html += '<i class="fa ' + icon + ' ' + party + ' border" aria-hidden="true"></i>';
	}

	// Append boxes to DOM
	$('#' + party + '-td').append(comm_html);
});

$(document).ready(function() {
	var pymChild = new pym.Child();
});