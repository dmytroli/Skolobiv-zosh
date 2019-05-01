'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); /*препроцесор*/
var plumber = require('gulp-plumber'); /*допомагає шукати помилки в препроцерному коді*/
var autoprefixer = require('autoprefixer'); /*астоматичне додавання префіксів в css*/
var postcss = require('gulp-postcss'); /*для роботи автопрефіксера*/
var browserSync = require('browser-sync').create(); /*для локального сервера*/
var minify = require('gulp-csso'); /*мініфікація*/
var rename = require("gulp-rename"); /*для збереження нової і зберегання старої версії*/
var imagemin = require('gulp-imagemin'); /*мініфікація зображень*/
var svgstore = require('gulp-svgstore'); /*для створення svg спрайту*/
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var minjs = require('gulp-uglify'); /*мініфікація js*/
var webp = require('gulp-webp');



gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(posthtml([
      include()
      ]))
    .pipe(gulp.dest('../www/')) 
});


gulp.task('sass', function() {
   return gulp.src('css/**/*.scss')
   .pipe(plumber())
   .pipe(sass())                                /*запуск препроцесора*/
   .pipe(postcss([ autoprefixer({               /*розставляння автопрефіксів*/
            browsers: ['last 6 versions'],
            cascade: true
        }) ]))
   .pipe(gulp.dest('css'))
   .pipe(minify())                             /*мініфікація css*/
   .pipe(rename("style.min.css"))              /*створення нового файлу*/
   .pipe(gulp.dest('css'))                     /*запис в новий файл мініфікованого */
   .pipe(browserSync.stream());
});

/*мініфікатор JS*/
gulp.task('minjs', function() {
   return gulp.src('js/*.js')
   .pipe(minjs())                         
   .pipe(gulp.dest('js/min.js/'))                     
});

/*імітація роботи сервера*/
gulp.task('br', function() {   
    browserSync.init({
      server: {
        baseDir: '../www/'
        },
        notify: false
    });
});

/*створення svg спрайту*/
gulp.task('svg', function() {                   
    return gulp.src('img/*.svg')
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest('img'))
});

/*мініфікація зображень*/
gulp.task('images', function() {                   
    return gulp.src('img/**/*.{png,svg}')
        .pipe(imagemin(
          [
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.svgo()
          ]))
        .pipe(gulp.dest('img'))
});

/*перетворенння в webp*/
gulp.task('webp', function() {                   
    return gulp.src('img/**/*.{png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('img'))
});

/*запуск основних функцій для розробки*/
gulp.task('watch', function() { 
	gulp.watch('./css/**/*.scss', gulp.series('sass'));
  gulp.watch('../www/*.html')
  .on('change', browserSync.reload);
});

/*запуск task один за одним*/
gulp.task('develop', gulp.series('sass', 'images', 'minjs')) 


/*копіювання тільки необхідних файлів в потрібну папку для передачі клієнту*/
gulp.task('copy', function() {                 
    return gulp.src([
      "../www/font/*.ttf",
      "../www/img/**",
      "../www/js/min.js/*.js",
      "../www/css/*.css",
      "*.html"
      ],
      {base: '../www'}
      )
      .pipe(gulp.dest('client'))
});




