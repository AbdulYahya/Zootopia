var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        'assets/js/vendor/jquery-slim.min.js',
        "assets/js/vendor/popper.min.js",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

////////////////////// TYPESCRIPT //////////////////////

gulp.task('tsClean', () => {
  return del(['app/**/**.js', 'app/**/**.js.map']);
});

gulp.task('tsHtmlClean', ['tsClean'], () => {
  return del(['./build/*.html']);
});

gulp.task('tsHtml', ['tsHtmlClean'], () => {
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('ts', ['tsHtml'], shell.task([
  'tsc'
]));



////////////////////// BOWER //////////////////////

gulp.task('jsBowerClean', () => {
  return del(['./build/js/vendor.min.js']);
});

gulp.task('jsBower', ['jsBowerClean'], () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', () => {
  return del(['./build/css/vendor.css']);
});

gulp.task('cssBower', ['cssBowerClean'], () => {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);


////////////////////// SASS //////////////////////

gulp.task('sassBuild', () => {
  return gulp.src(['resources/styles/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});


////////////////////// SERVER //////////////////////

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['resources/js/*.js'], ['jsBuild']); // Reload on any Vanilla JS changes.
  gulp.watch(['*.html', 'app/views/*.html'], ['htmlBuild']); // Reload on any HTML changes.
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']);
  gulp.watch(['app/*.ts'], ['tsBuild']); // Compile & Reload on any Typescript file changes.
});

gulp.task('jsBuild', () => {
  browserSync.reload();
});

gulp.task('htmlBuild', ['ts'], () => {
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], () => {
  browserSync.reload();
});

gulp.task('tsBuild', ['ts'], () => {
  browserSync.reload();
});


////////////////////// GLOBAL BUILD TASK //////////////////////
gulp.task('build', ['ts'], () => {
  // Production tag conditionals will go here
  gulp.start('bower');
  gulp.start('sassBuild');
});
