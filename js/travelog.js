$(function  () {
	$('#gallery').each(function  () {
		var $container = $(this),
			$filter = $('#gallery-filter'),
			addItemCount = 16,
			loadItemCount = 0,
			added=0,
			data=0,
			allData=[],
			filteredData=[];

		$container.masonry({
			columnWidth: 230,
			gutter: 10,
			itemSelector: '.gallery-item'
		});

		$.getJSON('../data/content.json', initGallery);

		
		function initGallery (data) {
			allData = data;
			filteredData = allData;
			addItems();

			$loadMoreButton.on('click', addItems);
			$filter.on('change', 'input[type="radio"]', filterItems);
		}
		function addItems (filter) {
			var elements = [],
				slicedData = filteredData.slice(added, added + loadItemCount);
			$.each(data, function  (i, item) {
				var itemHTML = '<li class="gallery-item is-loading">' +
									'<a href="../images/travelog/'+item.images.large+' ">' +
										'<img src="../images/travelog/' +
											item.images.thumb +'" alt="'+item.title+'">' +
											// '<img src="http://power4ce.cafe24.com/images/' +
											// item.images.thumb+'" alt="'+item.title+'">' +
											// '<span>'+item.title+'</span>' +
									'</a>' +
								'</li>';
				elements.push($(itemHTML).get(0));
			});
			$container
				.append(elements)
				.imagesLoaded(function  () {
					$(elements).removeClass('is-loading');
					$container.masonry('appended', elements);

					if(filter){
						$container.masonry();
					}
				});
				added += slicedData.length;

				if(added < filteredData.length){
					$loadMoreButton.show();
				} else{
					$loadMoreButton.hide();
				}
		}

		function filterItems () {
			var key = $(this).val(),
				masonryItems = $container.masonry('getItemElements');

			$container.masonry('remove', masonryItems);

			filteredData = [];
			added = 0;

			if(key === 'all'){
				filteredData = allData;
			}else{
				filteredData = $.grep(allData, function  (item) {
					return item.category === key;
				});
				addItems(true);
			}
		}
	});
});