var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');

gulp.task('copy-html', function(){
    return gulp.src('./src/**/*.html')
            .pipe(gulp.dest('./dev'))
            .pipe(browserSync.stream());
});


gulp.task('sass', function(){
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/css'))
        .pipe(browserSync.stream());
});


gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
            .pipe(concat('main.js'))
            .pipe(gulp.dest('./dev/js'))
            .pipe(browserSync.stream());
});

gulp.task('imagemin', function(){
    return gulp.src('./src/img/**/**/**')
            .pipe(imagemin())
            .pipe(gulp.dest('./dev/img'))
            .pipe(browserSync.stream());
});

gulp.task('default', ['imagemin', 'copy-html', 'sass', 'js'], function() {

    browserSync.init({
        server: "./dev"
    });

    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['copy-html']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/img/**/**/**', ['imagemin']);
});



//Production tasks
gulp.task('prod-js', function(){
    return gulp.src('./dev/js/main.js')
            .pipe(uglify())
            .pipe(gulp.dest('./prod/js'));
});

gulp.task('prod-copy-html', function(){
    return gulp.src('./dev/**/*.html')
            .pipe(gulp.dest('./prod'));
});

gulp.task('prod-minify-css', function(){
    return gulp.src('dev/css/*.css')
            .pipe(concat('main.css'))
            .pipe(cssnano())
            .pipe(gulp.dest('./prod/css'));
});

gulp.task('prod-image-copy', function(){
    return gulp.src('./dev/img/**/**/**')
            .pipe(gulp.dest('./prod/img'));
});

gulp.task('prod-clean', function(){
    return gulp.src('./prod', {read: false})
        .pipe(clean());
});

//Run this task to make prod build and make sure that it opens in browser correctly
gulp.task('prod-serve', ['prod-clean', 'prod-image-copy', 'prod-copy-html', 'prod-minify-css', 'prod-js'], function() {

    browserSync.init({
        server: "./prod"
    });
});
