(function(global, hw){
	'use strict';

	// View 이벤트 대상 참조 및 변수 설정
	var	container       = document.querySelector('.portfolio_list'),
		pagenation      = document.querySelector('.hw-gallery-pagenation'),
		pagenation_btns = pagenation.querySelectorAll('a'),
		container_width = 552;

	// 페이지네이션 첫번째 요소에 동적으로 활성화 클래스 설정
	// 메인페이지 보여주기
	var current_index = 0;

		// 갤러리 컨테이너 요소에 스타일 설정
	container.style.width = container_width;
	container.classList.add('anim');

	/**
	 * --------------------------------
	 * 이벤트 핸들링
	 * 이벤트 대상 반복 구문 처리
	 * 이벤트 위임
	 * --------------------------------
	 */
	// 유사배열인 pagenation_btns 노드리스트가
	// 배열 인스턴스의 forEach 메소드(함수)를 빌려서
	// data-index 속성을 동적으로 설정합니다.
	each(pagenation_btns, function(item, index) {
		item.setAttribute('data-index', index);
		item.onclick = slideGallery;
	});

	// 슬라이드 초기 실행
	slide(current_index);

	/**
	 * --------------------------------
	 * 이벤트 핸들러
	 * --------------------------------
	 */
	function slideGallery() {

		// <a> 요소 클릭 시, 이미 on 클래스가 설정되어 있으면 함수 종료
		if ( this.classList.contains('on') ) { return false; }

		// 클릭한 <a> 요소 인덱스를 index 변수에, container의 가로 폭 길이 만큼 distance_x 설정
		var index      = this.getAttribute('data-index'),
			distance_x = -1 * container_width * index + 'px';

			console.log(distance_x);

		// 부모 요소의 모든 자식들에게 removeOnClass 함수 적용
		each(this.parentNode.children, removeOnClass);

		// 클릭한 <a> 요소에 활성화 클래스 속성 on을 설정
		this.classList.add('on');

		// 클릭한 <a> 요소의 인덱스를 current_index 변수에 설정
		// (클릭할 때, 자동 재생될 때 마다 변경)
		current_index = index;

		// container 요소에 transform 값을 설정하여 슬라이딩 처리
		container.style.transform = 'translateX(' + distance_x + ')';

		// 기본 동작 차단
		return false;
	}

	/**
	 * 갤러리 슬라이드 함수
	 * @param  {Number} slide_index 슬라이드 버튼 컴포넌트 인덱스
	 */
	function slide(slide_index) {
		pagenation_btns[slide_index].onclick();
	}


	/**
	 * 활성화 클래스 on 속성 제거 함수
	 * @param  {DOM ElementNode} item 문서 객체
	 */
	function removeOnClass(item) {
		if ( item.classList.contains('on') ) {
			item.classList.remove('on');
		}
	}

	/**
	 * 노드리 리스트 반복 구문 헬퍼 함수
	 * @param  {NodeList} nodeList 반복 처리할 문서객체 노드 리스트
	 * @param  {Function} fn 개별 노드에 적용할 함수
	 */
	function each(nodeList, fn) {
		[].forEach.call(nodeList, fn);
	}

	/**
	 * --------------------------------
	 * hanwha.controller 객체 설정
	 * --------------------------------
	 */
	// hw.controller = {
	// 	'slide'     : slide,
	// };

})(window, window.hanwha);