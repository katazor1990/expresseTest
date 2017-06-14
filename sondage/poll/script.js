$(document).ready(function() {
	$('#listall').click(function() {
		$.ajax('http://localhost:3000/polls', {
			method: 'GET',
			success: function(response) {
				response.forEach(function(poll) {
					$('#polls').append('<h2>' + poll.question + '<h2>');
				})
			},
			error: function(error) {
				console.error(error);
			}
		});
	});
});