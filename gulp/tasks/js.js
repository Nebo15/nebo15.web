var gulp = require('gulp');
var include = require("gulp-include");
var config = require('../config');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
reload = browserSync.reload;

gulp.task('js', function () {
    gulp.src([
        config.src.js +'lib/jquery.js',
        config.src.js +'lib/*.js', config.src.js+'*.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:watch', function() {
    gulp.watch(config.src.js+'*', ['js']);
});
