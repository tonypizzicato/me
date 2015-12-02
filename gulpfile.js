var gulp       = require('gulp');
var usemin     = require('gulp-usemin');
var uglify     = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss  = require('gulp-minify-css');
var rev        = require('gulp-rev');
var browserify = require("browserify");
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var del        = require('del');
var seq        = require('gulp-sequence');

gulp.task('clean', function () {
    return del(['.tmp', 'dist']);
});

gulp.task("js", function () {
    return browserify({entries: './src/js/app.js', debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(".tmp/js"));
});

gulp.task('usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            css:       [rev()],
            html: [minifyHtml({empty: true})],
            js:   [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest('dist/'));
});


gulp.task('default', seq('clean', 'js', 'usemin'));
