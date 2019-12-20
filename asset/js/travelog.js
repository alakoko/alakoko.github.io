(function($){
	var gallery = document.getElementById('gallery'),
		$gallery = $(gallery),
		$img,
		imgLoad,
		$preloader = $('<img class="preloader" src="../asset/images/imgloading.gif">'),
		$loadMoreBtn = $('#loadMore'),
		$filter = $('#galleryFilter'),
		loadItemCount = 10,
		added = 0,
		allData = [],
		filteredData = [],
		popupImgLoad;

	var
	// 갤러리 초기화 - json 로드 완료시 실행
	initGallery = function(data){
		allData = data;
		filteredData = allData;
		addItems();
		$filter.on('change', 'input[type="radio"]', filterItems);
	},

	// 이미지 추가 - 최초 로딩시 / 더보기버튼 클릭시 / 필터 적용시 실행
	addItems = function(filter){
		var elements = [],
			slicedData = filteredData.slice(added, added + loadItemCount),

		// imagesLoaded Handlers
		afterLoad = function(filter){
			added += slicedData.length;
			$loadMoreBtn.off('click').on('click', addItems);

			setTimeout(function(){
				// json 데이터양만큼 로드가 완료될 경우 '더보기'버튼 숨김
				if(added < filteredData.length) $loadMoreBtn.show();
				else $loadMoreBtn.hide();			
				$preloader.detach();
				$gallery.find('li').removeClass('img-loading');
				$gallery.masonry('appended', elements);

				// 필터링시 재배치
				if(filter) $gallery.masonry();
			}, 300);
		},
		loadFailed = function(){
			console.log('load failed');
		};

		// 이미지리스트 동적 생성
		$preloader.appendTo('body');
		$.each(slicedData, function(i, item){
			var sizeType = Math.ceil(Math.random()*2);
			var itemHTML = 
					'<li class="img-loading size-' + sizeType + '">' +
						'<a href="../asset/images/travelog/' + item.images.large + '">' +
							'<img src="../asset/images/travelog/' + item.images.thumb + '" alt="' + item.title + '">' +
							'<span><strong>'+item.title +'</strong></span>' +
						'</a>' +
					'</li>';
			elements.push($(itemHTML)[0]);
		});
		$gallery.append(elements);
		
		// imgLoad가 있는 경우(처음 로딩할 때룰 제외한 모든 경우) 바인딩 해제 후 다시 연결해줘야 함.
		if(imgLoad) imgLoad.off('done fail');

		// 기존 $img변수는 추가된 이미지에 대한 정보가 담겨있지 않으므로, 갱신해주어야 함.
		$img = $gallery.find('img');
		imgLoad = imagesLoaded($img[0]);
		imgLoad.on('done', function(){
			afterLoad(filter);
		})
		.on('fail', loadFailed);
	},

	// 필터링 기능 - 필터 적용시 실행
	filterItems = function(){
		var key = $(this).val(),
			masonryItems = $gallery.masonry('getItemElements');

		// 필터가 바뀔 경우 기존 이미지를 삭제하고 새로 보여줘야 하므로.
		$gallery.masonry('remove', masonryItems);
		filteredData = [];
		added = 0;

		// 필터 적용
		if(key === 'all') { filteredData = allData; }
		else {
			filteredData = $.grep(allData, function(item){
				return item.category === key;
			});
		}
		addItems(true);
	},

	// 이미지 확대보기(팝업)
	lightBoxShow = function(e){
		var $t = $(this),
			href = $t.attr('href'),
			$popup = $('#popup'),
			$popupWrap = $('#popupWrap');		
		e.preventDefault();

		$preloader.appendTo('body');
		$popup.hide().html('<img src=' + href + ' alt="">');
		$popupWrap.stop(true).fadeIn(300);
		if(popupImgLoad) popupImgLoad.off('done');	
		popupImgLoad = imagesLoaded($popup.find('img')[0]);
		popupImgLoad.on('done', function(){
			$preloader.detach();
			$popup.fadeIn(300);
		}).on('fail', function(){
			$preloader.detach();
			$popupWrap.hide();
		});
	},
	lightBoxHide = function(){
		$(this).stop(true).fadeOut(300, function(){
			$('#popup').html('');
		});
	},

	// 마우스 이동방향을 얻어오는 함수.
	// 0:top, 1:right, 2:bottom, 3:left
	getMouseDirection = function(e){
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


	// 최초 실행 (초기화)
	$gallery.masonry({
		columnWidth: 150,
		gutter: 10,
		itemSelector: 'li'
	});
	// $.getJSON('../data/imgdata2.json', initGallery);
	$.getJSON('../asset/data/content.json', initGallery);
	// 콜백 등록
	$gallery.on('mouseenter mouseleave', 'a', hoverDirection)
	.on('click', 'a', lightBoxShow);
	$('#popupWrap').on('click', lightBoxHide);
	$('#popup').on('click', function(e){ e.stopPropagation();});

})(jQuery);