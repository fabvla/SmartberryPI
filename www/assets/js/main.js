$(document).on('click', '.toggle-button', function() {
	$.ajax({
	    url:"/api/status/toggle",
	    success:function(data) {
	    }
	});
	$(this).toggleClass('toggle-button-selected');
});