'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var minifyHtml = require('gulp-minify-html');

gulp.task('default', function() {
    gulp.src('src/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('minify-html', function() {
    return gulp.src('src/templates/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('vet', function() {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'), {verbose: true})
        .pipe(jshint.reporter('fail'));
});
