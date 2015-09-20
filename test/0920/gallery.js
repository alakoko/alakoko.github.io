(function  ($) {
	var $gallery = $('#gallery'),
		$img,
		$preloader=$('<img class="preloader" src="http://power4ce.cafe24.com/images/ajax-loader.gif">');

	var initGallery = function  (data) {
		var elements=[];
		var afterLoad = function  () {
			setTimeout(function  () {
				$preloader.remove();
				$img.removeClass('img-loading');
				$gallery.masonry('appended', elements);
			}, 300);
		},
		onProgress = function  (instance, image) {
			var result = image.isLoaded ? 'loaded' : 'broken';
			console.log('image is ' + result + 'for' + image.img.src)
		},
		loadFailed = function  () {
			console.log('load failed');
		};

		$.each(data, function  (i, item) {
			var sizeType = Math.ceil(Math.random()*2);
			var itemHTML =	'<li class="size-'+sizeType+'">' +
									'<a href="http://power4ce.cafe.com/images/'+item.images.large+' ">' +
										'<img class="img-loading" src="http://power4ce.cafe24.com/images/' +
											item.images.thumb +'" alt="'+item.title+'">' +
											'<span>'+item.title+'</span>' +
									'</a>' +
								'</li>';
			elements.push($(itemHTML)[0]);
		});
		$gallery.append(elements);
		$img = $gallery.find('img');

		$img.imagesLoaded()
		.done(afterLoad)
		.progress(onProgress)
		.fail(loadFailed)
	};

	$gallery.masonry({
		columWidth: 150,
		gutter: 10,
		itemSelector: 'li'
	});
	$.getJSON('imgdata.json', initGallery);
	$preloader.appendTo('body');
})(jQuery);