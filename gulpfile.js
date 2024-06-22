const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

gulp.task('build', function () {
  return gulp
    .src(['./public/build-css/main.css'], {
      includePaths: ['node_modules'],
    })
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

gulp.task(
  'build-css',
  gulp.series('build', function (done) {
    done();
  }),
);
