var gulp = require('gulp'),
	includer = require('gulp-htmlincluder'),
	sourcemap = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
    concat = require('gulp-concat');

 
gulp.task('scriptsConcat', function() {
  return gulp.src('dev/js/includes/*.js')
    .pipe(concat('functions.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('html', function(){
	gulp.src('dev/html/**/*.html')
		.pipe(includer())
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	gulp.src('dev/sass/**/*.scss')
	.pipe(sourcemap.init())
	.pipe(sass())
	.pipe(sourcemap.write())
	.pipe(gulp.dest('build/css/'))
	.pipe(connect.reload());
});

gulp.task('move', function(){
	gulp.src('dev/fonts/**/*.*').pipe(gulp.dest('build/fonts/'));
	gulp.src('dev/js/*.js').pipe(gulp.dest('build/js/'));
	gulp.src('dev/img/**/*.*').pipe(gulp.dest('build/img/'));
	connect.reload();
})

gulp.task('default', function(){
	gulp.start('html', 'sass', 'move','scriptsConcat');
	connect.server({
		root: 'build/',
		levereload: true
	});
	gulp.watch(['dev/html/**/*.html'], ['html']);
	gulp.watch(['dev/sass/**/*.scss'], ['sass']);
    gulp.watch(['dev/fonts/**/*.*', 'dev/js/*.js', 'dev/img/**/*.*'], ['move']);
    gulp.watch(['dev/js/includes/*.js'], ['scriptsConcat']);
})