(function($) {
	var gallery = document.getElementById('gallery'),
		$gallery = $(gallery),
		$img,
		imgLoad,
		$preloader=$('<img class="preloader" src="http://power4ce.cafe24.com/images/ajax-loader.gif">'),
		$loadMoreBtn = $('#loadMore'),
		$filter = $('#galleryFilter'),
		loadItemCount = 10,
		added = 0,
		allData = [],
		filteredData=[],
		popupImgLoad;

	var 
		initGallery = function  (data) {
		allData = data;
		filteredData = allData;
		addItems();
		$filter.on('change', 'input[type="radio"]',filterItems);
		// var elements=[];
		// var afterLoad = function  () {
		// 	setTimeout(function  () {
		// 		$preloader.remove();
		// 		$img.removeClass('img-loading');
		// 		$gallery.masonry('appended', elements);
		// 	}, 300);
		// },
		// onProgress = function  (instance, image) {
		// 	var result = image.isLoaded ? 'loaded' : 'broken';
		// 	console.log('image is ' + result + 'for' + image.img.src)
		// },
		// loadFailed = function  () {
		// 	console.log('load failed');
		// };

		// $.each(data, function  (i, item) {
		// 	var sizeType = Math.ceil(Math.random()*2);
		// 	var itemHTML =	'<li class="size-'+sizeType+'">' +
		// 							'<a href="http://power4ce.cafe.com/images/'+item.images.large+' ">' +
		// 								'<img class="img-loading" src="http://power4ce.cafe24.com/images/' +
		// 									item.images.thumb +'" alt="'+item.title+'">' +
		// 									'<span>'+item.title+'</span>' +
		// 							'</a>' +
		// 						'</li>';
		// 	elements.push($(itemHTML)[0]);
		// });
		// $gallery.append(elements);
		// $img = $gallery.find('img');

		// $img.imagesLoaded()
		// .done(afterLoad)
		// .progress(onProgress)
		// .fail(loadFailed)
	},
	//이미지 추가 - 최초 로딩시 /더보기 버튼 클릭시/ 필터 적용시 실행
	addItems = function(filter) {
		console.log('addItems');
		var elements = [],
			slicedData = filteredData.slice(added, added+loadItemCount),

		afterLoad = function  (filter) {
			console.log('afterLoad');
			added += slicedData.length;
			$loadMoreBtn.off('click').on('click', addItems);

			setTimeout(function() {
				if(added<filteredData.length) $loadMoreBtn.show();
				else $loadMoreBtn.hide();
				$preloader.detach();
				$gallery.find('li').removeClass('img-loading');
				$gallery.masonry('appended', elements);

				if(filter) $gallery.masonry();
			}, 300);
		},
		loadFailed = function  () {
			console.log('load failed');
		};
		$preloader.appendTo('body');
		$.each(slicedData, function  (i,item) {
			var sizeType = Math.ceil(Math.random()*2);
			var itemHTML =	'<li class="size-'+sizeType+'">' +
									'<a href="http://power4ce.cafe.com/images/'+item.images.large+'">' +
										'<img src="http://power4ce.cafe24.com/images/' +
											item.images.thumb+'" alt="'+item.title+'">' +
											'<span>'+item.title+'</span>' +
									'</a>' +
								'</li>';
			elements.push($(itemHTML)[0]);
		});
		$gallery.append(elements);
		if(imgLoad) imgLoad.off('done fail');

		$img = $gallery.find('img');
		imgLoad = imagesLoaded($img[0]);
		imgLoad.on('done', function  () {
			afterLoad(filter);
		})
		.on('fail', loadFailed);
	},
	//필터링 기능, 필터 적용시 실행
	filterItems = function  () {
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
	//이미지 확대보기(팝업)
	lightBoxShow = function  (e) {
		var $t = $(this),
			href = $t.attr('href'),
			$popup = $('#popup'),
			$popupWrap = $('#popupWrap');
		e.preventDefault();
		$preloader.appendTo('body');
		$popup.hide().html('<img src='+href+'alt="">');
		$popupWrap.stop(true).fadeIn(300);
		if(popupImgLoad) popupImgLoad.off('done');
		popupImgLoad = imagesLoaded($popup.find('img')[0]);
		popupImgLoad.on('done', function  () {
			$preloader.detach();
			$popup.fadeIn(300);
		}).on('fail', function  () {
			$preloader.detach();
			$popupWrap.hide();
		});
	},
	lightBoxHide = function  () {
		$(this).stop(true).fadeOut(300, function  () {
			$('#popup').html(' ');
		});
	},
	//마우스 이동방향을 얻어오는 함수,
	//0:top, 1:light, 2:bottom, 3:left
	getMouseDirection = function  (e) {
		
	},
	//마우스 오버시 나타나는 박스의 이동방향을 결정하는 함수
	hoverDirection = function  (e) {
		
	};
	//최초 실행(초기화)
	$gallery.masonry({
		columWidth: 150,
		gutter: 10,
		itemSelector: 'li'
	});
	$.getJSON('imgdata.json', initGallery);
})(jQuery);