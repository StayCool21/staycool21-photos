'use strict';

var gulp = require('gulp');
// var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var path = require('path');
var through2 = require('through2');

gulp.task('delete', function () {
    return del(['images/*.*']);
});

// gulp.task('resize-images', function () {
//     return gulp.src('images/**/*.*')
//         .pipe(imageResize({
//             width: 1024,
//             imageMagick: true
//         }))
//         .pipe(through2.obj(function (file, _, cb) {
//             var folderName = path.basename(path.dirname(file.path));
//             file.path = path.join(file.base, 'images/fulls', folderName, path.basename(file.path));
//             cb(null, file);
//         }))
//         .pipe(gulp.dest('.'))
//         .pipe(through2.obj(function (file, _, cb) {
//             var folderName = path.basename(path.dirname(file.path));
//             file.path = path.join(file.base, 'images/thumbs', folderName, path.basename(file.path));
//             cb(null, file);
//         }))
//         .pipe(gulp.dest('.'));
// });

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./assets/sass/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'main.min'}))
        .pipe(gulp.dest('./assets/css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('sass'));
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./assets/js/main.js')
        .pipe(uglify())
        .pipe(rename({basename: 'main.min'}))
        .pipe(gulp.dest('./assets/js'));
});

// build task
gulp.task('build', gulp.series('sass', 'minify-js'));

// resize images
// gulp.task('resize', gulp.series('resize-images', 'delete'));

// default task
gulp.task('default', gulp.series('build'));