var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require(('del'));
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');


gulp.task('sass', function () {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload)
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('jsminify', function () {
   return gulp.src('dist/js/*.js')
       .pipe(babel({
           presets: ['es2015']
       }))
       .pipe(uglify())
       .pipe(gulp.dest('dist/js'));
});

gulp.task('imagemin', function () {
    return gulp.src('app/images/**/*.+(png|jpg|giv|webp)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('svgstore', function () {
    return gulp
        .src('resources/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('build', function () {
    runSequence('clean:dist', 'sass', 'useref', 'jsminify', 'svgstore', 'imagemin', 'fonts')
});