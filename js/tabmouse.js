(function($){
	// tab menu 함수
	$('#project, #example, #career').hide();
	$('.tab li').click(function  () {
		var activeTab = $(this).attr("rel");
		console.log("activeTab:"+activeTab);

		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$("#" + activeTab).fadeIn();

		$("section").not($("#" + activeTab)).hide();

	});


	var report_list = document.getElementById('report_list');
	var $report = $(report_list);

	var section_career = document.getElementById('career');
	var $career_list = $(section_career).find('ul');
	var $career = $($career_list);

	var portfolio_list = document.getElementById('portfolio_list');
	var $portfolio = $(portfolio_list);


	// 마우스 이동방향을 얻어오는 함수.
	// 0:top, 1:right, 2:bottom, 3:left
	var getMouseDirection = function(e){
		var $el = $(e.currentTarget),
			offset = $el.offset(),
			w = $el.outerWidth(),
			h = $el.outerHeight(),
			x = (e.pageX - offset.left - w/2) * ( w>h ? h/w : 1),
			y = (e.pageY - offset.top - h/2) * ( h>w ? w/h : 1),
			direction = Math.round(((Math.atan2(y, x) * (180 / Math.PI) + 180 ) / 90 ) + 3 ) % 4;
		return direction;
	},
		// 마우스오버시 나타나는 박스의 이동방향을 결정하는 함수
	hoverDirection = function(e){
		var $overlay = $(this).find('span'),
			side = getMouseDirection(e),
			animateTo,
			positionIn = { top:0, left:0 },
			positionOut = (function(){
				switch(side){
					// case0: top, case1: right, case2: bottom, default: left
					case 0  : return {top: '-100%', left: 0      }; break;
					case 1  : return {top: 0,       left: '100%' }; break;
					case 2  : return {top: '100%',  left: 0      }; break;
					default : return {top: 0,       left: '-100%'}; break;
				}
			})();
		if(e.type === 'mouseenter'){
			animateTo = positionIn;
			$overlay.css(positionOut);
		} else {
			animateTo = positionOut;
		}
		$overlay.stop(true).animate(animateTo, 250);
	};

	//report tab action
	$report.children('li').addClass('report_item');
	$report.find('span').addClass('caption');
	$report.on('mouseenter mouseleave', '.report_item a', hoverDirection);


	//career tab action
	$career.children('li').addClass('report_item');
	$career.find('span').addClass('caption');
	$career.on('mouseenter mouseleave', '.report_item a', hoverDirection);

	//portfolio tab action
	$portfolio.children('li').addClass('report_item');
	$portfolio.find('span').addClass('caption');
	$portfolio.on('mouseenter mouseleave', '.report_item a', hoverDirection);

})(jQuery);
