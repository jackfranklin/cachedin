var gulp = require('gulp');
var tasks = require('gulp-load-plugins')();

gulp.task('test', function() {
  gulp.src('spec/**/*_spec.js').pipe(tasks.jasmine());
});

