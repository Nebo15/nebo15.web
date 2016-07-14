var gulp = require('gulp');
var rimraf = require('rimraf');
var ghPages = require('gulp-gh-pages');
var config = require('../config');
var rimraf = require('rimraf');
var ghPages = require('gulp-gh-pages');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'images:watch',
    'sass:watch',
    'copy:watch',
    'html:watch',
    'font:watch',
    'js:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['build', 'server', 'watch'], function() {});
gulp.task('build', ['html','font','sprite','images','copy','js','sass'], function() {});

gulp.task('deploy', function () {
  return gulp.src([
      'build/**/*',
      'CNAME'
  ])
      .pipe(ghPages());
});