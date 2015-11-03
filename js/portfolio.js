$('#project').hide();
$('.tab li').click(function  () {
	var activeTab = $(this).attr("rel");
       	// console.log("activeTab:"+activeTab);

    var offTab = $(this).siblings('li').attr("rel");
    	// console.log("offTab:"+offTab);

	$(this).siblings().removeClass('on');
	$(this).addClass('on');
	$("#" + activeTab).fadeIn();
	$("#" + offTab).hide();

});

