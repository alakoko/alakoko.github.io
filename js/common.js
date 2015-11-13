$(document).ready(function() {
	
	if (window.location.href && document.getElementById('CP')) {
		$('#CP').addClass('current');
		 }
	
	var $btnTop = $('#back_top');
	var btnTop = function(){
			var scrt = $('body').scrollTop(),
				wh = $(window).height() / 2;
			if(scrt > wh) $btnTop.fadeIn();
			else $btnTop.fadeOut();
		}
		btnTop();
		$(window).on('scroll', function(){ btnTop(); });
});