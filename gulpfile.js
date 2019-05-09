'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); /*препроцесор*/
var plumber = require('gulp-plumber'); /*допомагає шукати помилки в препроцерному коді і не припиняє астоматизацію*/
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
var clean = require('gulp-clean');



gulp.task('clean', function () {
    return gulp.src('client/*', {read: false})
        .pipe(clean());
});


/*інлайнить svg в html документи
  <div style="display: none">
    <include src="img/sprite.svg"></include>  
  </div>
*/
gulp.task('phtml', function() {
  return gulp.src('../www/*.html')
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('client/')) 
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
                /*створення нового файлу*/
   .pipe(gulp.dest('css'))                     /*запис в новий файл мініфікованого */
   .pipe(browserSync.stream());
});

/*мініфікатор JS*/
gulp.task('minjs', function() {
   return gulp.src('js/*.js')
   .pipe(minjs())                         
   .pipe(gulp.dest('client/js'))                     
});


//імітація роботи сервера контролюються всі зміни в усіх файлах
gulp.task('br', function() {   
    browserSync.init({server: '.'});
    gulp.watch('css/**/*.scss', gulp.series('sass'));
    gulp.watch('../www/*.html').on('change', browserSync.reload);
    gulp.watch('css/*.scss').on('change', browserSync.reload);
});



/*створення svg спрайту*/
gulp.task('svg', function() {                   
    return gulp.src('img/*.svg')
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest('client/img'))
});

/*мініфікація зображень*/
gulp.task('images', function() {                   
    return gulp.src('client/img/**/*.{png,svg}')
        .pipe(imagemin(
          [
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.svgo()
          ]))
        .pipe(gulp.dest('client/img/'))
});

/*перетворенння в webp*/
gulp.task('webp', function() {                   
    return gulp.src('img/**/*.{png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('img'))
});




/*запуск основних функцій для розробки (не працює)*/
//gulp.task('watc', function() { 
	//gulp.watch('./css/**/*.scss', gulp.series('sass'));
  //gulp.watch('../www/*.html')
  //.on('change', browserSync.reload);
//});


/*копіювання тільки необхідних файлів в потрібну папку для передачі клієнту*/
gulp.task('copy', function() {                 
    return gulp.src([
      "fonts/*.ttf",
      "img/**",
      "js/*.js",
      "css/*.css",
      "*.html"
      ],
      {base: '.'}
      )
      .pipe(gulp.dest('client'))
});

/*запуск task один за одним: очищення, копіювання, перетворення в css, автопрефікси, мініфікація js, спрайт svg, мініфікація зображень, інлайн svg в html*/
gulp.task('develop', gulp.series('clean', 'copy', 'sass', 'minjs', 'svg', 'images', 'phtml')); 




