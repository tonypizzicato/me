var gulp         = require('gulp');
var usemin       = require('gulp-usemin');
var uglify       = require('gulp-uglify');
var minifyHtml   = require('gulp-minify-html');
var minifyCss    = require('gulp-minify-css');
var rev          = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require("browserify");
var babelify     = require('babelify');
var source       = require('vinyl-source-stream');
var copy         = require('gulp-copy');
var del          = require('del');
var seq          = require('gulp-sequence');

var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root:       'dist',
        livereload: true
    });
});

gulp.task('clean', function () {
    return del(['.tmp', 'dist']);
});

gulp.task('clean:css', function () {
    return del(['dist/styles/*.css']);
});

gulp.task('copy:favicon', function () {
    return gulp.src(['favicon.ico'])
        .pipe(copy('dist', {prefix: 1}));
});

gulp.task('copy:fonts', function () {
    return gulp.src(['fonts/*.{woff,eot,ttf,svg}'])
        .pipe(copy('dist/styles', {prefix: 1}));
});

gulp.task('copy:images', function () {
    return gulp.src(['images/*.*'])
        .pipe(copy('dist/images', {prefix: 1}));
});


gulp.task("js", function () {
    return browserify({entries: './src/js/app.js', debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(".tmp/js"));
});

gulp.task('usemin', function () {
    var conf = {
        css:       [autoprefixer({browsers: ['last 2 versions']}), minifyCss(), rev()],
        html:      [minifyHtml({empty: true})],
        js:        [uglify(), rev()],
        images:    [rev()],
        inlinejs:  [uglify()],
        inlinecss: [minifyCss(), 'concat']
    };

    return gulp.src('./*.html')
        .pipe(usemin(conf))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(['./*.html', 'src/css/*'], ['clean:css', 'usemin']);
});

gulp.task('default', seq('clean', ['copy:favicon', 'copy:fonts', 'copy:images'], 'js', 'usemin', 'connect', 'watch'));
