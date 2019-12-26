var gulp        = require('gulp'),
	watch = require('gulp-watch'),
	/* Browser 서버/싱크 ------------------------- */
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;


/**
 * ----------------------------------------------------------------
 * Gulp 업무
 * ----------------------------------------------------------------
 */
// 기본 업무 (serve)
gulp.task('default', ['serve']);

// Static Server + watching html/js/css files
gulp.task('serve', function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("./pages/*.html").on('change', browserSync.reload);
    gulp.watch("./asset/css/*.css").on('change', browserSync.reload);
    gulp.watch("./asset/js/*.js").on('change', browserSync.reload);
});

/**
 * ----------------------------------------------------------------
 * 유틸리티
 * ----------------------------------------------------------------
 */
// 오류 출력을 위한 errorLog 함수
// 오류 발생 시에도 watch 업무 중단하지 않음.
function errorLog(error) {
	console.error(error.message);
	this.emit('end');
}