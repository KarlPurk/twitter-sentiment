'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

gulp.task('js', function() {

    var browserify = require('browserify');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');


    var bundler = browserify({
        entries: ['./app/main.js'],
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source(getBundleName() + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js/'));
    };

    return bundle();
});

gulp.task('css', function() {

    var gulp = require('gulp');
    var sass = require('gulp-sass');

    gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('default', ['js', 'css']);