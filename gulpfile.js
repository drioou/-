var gulp = require('gulp');
var sass = require("gulp-sass")
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var reload = browserSync.reload;
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var size = require('gulp-size');
var del = require('del');
var revDel = require('rev-del');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');  //gulp里的task都是异步并发执行的，有的时候我们需要一连串的task按顺序执行，这时就需要run-sequence登场了。
var CacheBuster = require('gulp-cachebust');
var sourcemaps = require('gulp-sourcemaps');
var cachebust = new CacheBuster();
var cssver = require('gulp-make-css-url-version');
var reveasy = require("gulp-rev-easy");

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist', 'src/rev/*.*', 'src/tmp']);
});

// 压缩图片
gulp.task('minimg', function() {
  // var revAll = new RevAll();
  gulp.src('src/images/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});
// 压缩首页
gulp.task('miniindex', function() {
  return gulp.src('src/*.html')
    .pipe(reveasy())
    .pipe(htmlmin({
      collapseWhitespace: true, //压缩html
      removeComments: true, //清除注释
    }))
    .pipe(size())
    .pipe(gulp.dest('dist'));
});
gulp.task('miniindexs', function() {
  return gulp.src('src/*.shtml')
    .pipe(gulp.dest('dist'));
});
// 压缩子页
gulp.task('minicon', function() {
    return gulp.src('src/content/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true, //清除注释
      }))
      .pipe(reveasy())
      .pipe(gulp.dest("dist/content"));
  })
  /* Scripts task */
gulp.task('scripts', function() {
  return gulp.src(['src/scripts/*.js'])
    .pipe(size())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});
/* Sass task */
gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/styles'));
});
gulp.task('css', function() {
    return gulp.src('src/styles/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认：true
      }))
      .pipe(minifycss())
      .pipe(size())
      .pipe(cssver())
      .pipe(gulp.dest('dist/styles'));
  })
  /* Reload task */
gulp.task('bs-reload', function() {
  browserSync.reload();
});
/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
  browserSync.init(['dist/styles/*.css', 'dist/scripts/*.js'], {
    server: {
      baseDir: './dist'
    }
  });
});
/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['build'], function() {
  /* Watch scss, run the sass task on change. */
  gulp.watch(['src/sass/main.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['src/scripts/*.js'], ['scripts'])
  gulp.watch(['src/images/*.{png,jpg,gif,ico}'], ['minimg'])
  gulp.watch(['src/styles/*.css'], ['css'])
  gulp.watch(['src/*.html'], ['miniindex'])
  gulp.watch(['src/*.shtml'], ['miniindexs'])
  gulp.watch(['src/content/*.html'], ['minicon'])
    /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['dist/index.html', 'content/*.html'], ['bs-reload']);
});
gulp.task('build', function(done) {
  runSequence(
    ['clean'], ['minimg'], ['sass'], ['css'], ['scripts'], ['miniindex'],['miniindexs'], ['minicon'], ['browser-sync'],
    done);
});
