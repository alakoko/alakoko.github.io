$(document).ready(function() {
	if (window.location.href && document.getElementById('CP')) {
		$('#CP').addClass('current');
		 }

	var $tab_li= $('#portfolio .tab li');
	console.log($tab_li);
	$tab_li.addClass('on');
});