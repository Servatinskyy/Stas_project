'use strict';

//gulp
let gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    cssnano     = require('gulp-cssnano'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    useref      = require('gulp-useref'),
    imagemin    = require('gulp-imagemin'),
    sourcemaps  = require('gulp-sourcemaps'),
    postcss     = require('gulp-postcss'),
    browserify  = require('gulp-browserify'),
    pngquant    = require('imagemin-pngquant'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

//postCSS
gulp.task('css', () => {

    let processorArray = [
        require('postcss-partial-import')({
            plugins: [
                require('stylelint')('./stylelint.config.js'),
                require('postcss-browser-reporter')()
            ],
        }),
        require('postcss-simple-vars')(),
        require('postcss-mixins')(),
        require('postcss-extend')(),
        require('postcss-cssnext')('./browserslist'),
        require('postcss-short')(),
        require('postcss-short-text')(),
        require('postcss-clearfix')(),
        require('postcss-autoreset')({
            reset: 'sizes'
        }),
        require('postcss-assets')({
            loadPaths: ['src/img/'],
            relativeTo: 'src/styles/'
        }),
        require('postcss-font-magician')({
            hosted: '../fonts'
        }),
        require('doiuse')({
            browsers: ['ie >= 8', '> 1%']
        })
    ];
    return gulp.src('./src/postcss/main.css')
        .pipe(postcss(processorArray))
        .pipe(gulp.dest('./src/css'))
        .pipe(reload({
            stream: true
        }));
});

//imagenin
gulp.task('images', () => {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            une: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

//script
gulp.task('scripts', () => {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(reload({
            stream: true
        }));
});

//bower-wiredep
gulp.task('bower', () => {
    gulp.src('./src/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here',
            directory: 'src/libs/'
        }))
        .pipe(gulp.dest('./src'));
});

//browser-sync
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./src"
        },
        notify: false
    });
});

//clean
gulp.task('clean', () => {
    return gulp.src('dist', {
        read: false
    })
});

//build
gulp.task('build', ['clean', 'css', 'images'], () => {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

//watch
gulp.task('watch', ['browser-sync', 'build'], () => {
    gulp.watch('bower.json', ['bower']);
    gulp.watch('./src/img/**/*', ['images']);
    gulp.watch('./src/**/*.css', ['css', browserSync.reload]);
    gulp.watch(['./src/**/*.js', 'main.js'], ['scripts', browserSync.reload]);
    gulp.watch('./src/*.html', browserSync.reload);
});

gulp.task('default', ['bower', 'css', 'scripts', 'browser-sync', 'watch']);
