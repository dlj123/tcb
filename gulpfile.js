var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

gulp.task('sass',function(){

	return gulp.src('sass/**/*.scss')

		.pipe(plugins.sourcemaps.init())

		.pipe(plugins.sass({outputStyle: 'compressed'}).on('error',plugins.sass.logError))

		.pipe(plugins.sourcemaps.write('.'))

		.pipe(gulp.dest('css'))
})
gulp.task('watch',function(){

	  gulp.watch('sass/**/*.scss',['sass'])
})
gulp.task('default',['sass','watch'])



