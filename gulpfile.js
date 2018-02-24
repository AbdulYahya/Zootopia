const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const lib = require('bower-files')({
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
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const utilities = require('gulp-util');

const buildProduction = utilities.env.production;


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
  return del(['./build/css/vendor.min.css']);
});

gulp.task('cssBower', ['cssBowerClean'], () => {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
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


////////////////////// IMAGES //////////////////////

gulp.task('images', () => {
  gulp.src('resources/images/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('minifyImages', () => {
	gulp.src('resources/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/images'))
});

////////////////////// SERVER //////////////////////

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['*.html', 'app/views/*.html'], ['htmlBuild']); // Reload on any HTML changes.
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']); // Reload on any CSS/SCSS changes
  gulp.watch(['resources/images/*.png', 'resources/images/*.jpg', 'resources/images/*.svg'], ['imgBuild']); // Reload on any PNG/JPG/SVG changes.
  gulp.watch(['resources/js/*.js'], ['jsBuild']); // Reload on any Vanilla JS changes.
  gulp.watch(['app/*.ts'], ['tsBuild']); // Compile & Reload on any Typescript file changes.
});

gulp.task('htmlBuild', ['ts'], () => {
  browserSync.reload();
});

gulp.task('jsBuild', () => {
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], () => {
  browserSync.reload();
});

gulp.task('imgBuild', ['minifyImages'], () => {
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
  gulp.start('minifyImages');
});
