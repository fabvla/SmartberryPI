$(document).on('click', '.toggle-button', function() {	
	var id = $(this).attr('id');
	if( id == 'master' ){
		$.ajax({
		    url:"/api/status/toggle",
		    success:function(data) {
		    }
		});
	}
	else{
		$.ajax({
		    url:"/api/devices/" + id + "/toggle",
		    success:function(data) {
		    }
		});
	}
	$(this).toggleClass('toggle-button-selected');
});