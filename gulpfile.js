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
const vinylPaths = require('vinyl-paths');

const buildProduction = utilities.env.production;


////////////////////// TYPESCRIPT //////////////////////

gulp.task('ts:clean', () => {
  return del(['build/compiled_ts']);
});

gulp.task('ts:htmlClean', ['ts:clean'], () => {
  return del(['build/*.html']);
});

gulp.task('ts:html', ['ts:htmlClean'], () => {
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('ts:compile', ['ts:html'], shell.task([
  'tsc'
]));


/*
*   Purpose: Clean up app directory
*
*   Issue: Not working because, by moving all of the .js & .js.map files
*          from the app dir after the fact (ts:compile) all the links are broken
*
*   e.g., (main.ts): import { AppModule } from './app.module' can no longer
*                    find .js & .js.map files because we moved them....
*/

// gulp.task('ts', ['ts:compile'], () => {
//   return gulp.src(['app/**/**.js', 'app/**/**.js.map'])
//     .pipe(vinylPaths(del))
//     .pipe(gulp.dest('build/compiled_ts'));
// });

////////////////////// BOWER //////////////////////

gulp.task('bower:jsClean', () => {
  return del(['build/js/vendor.min.js']);
});

gulp.task('bower:js', ['bower:jsClean'], () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('bower:cssClean', () => {
  return del(['./build/css/vendor.min.css']);
});

gulp.task('bower:css', ['bower:cssClean'], () => {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bower:js', 'bower:css']);


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
  gulp.watch(['app/**/**.ts'], ['tsBuild']); // Compile & Reload on any Typescript file changes.
});

gulp.task('htmlBuild', ['ts:html'], () => {
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

gulp.task('tsBuild', ['ts:compile'], () => {
  browserSync.reload();
});


////////////////////// GLOBAL BUILD TASK //////////////////////
gulp.task('build', ['ts:compile'], () => {
  // Production tag conditionals will go here
  gulp.start('bower');
  gulp.start('sassBuild');
  gulp.start('minifyImages');
});
