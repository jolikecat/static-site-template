const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const mode = require('gulp-mode')({
  modes: ["production", "development"],
  default: "development",
  verbose: false
});
const fs = require('fs');

const paths = {
  'root' : './dist/',
  'template' : './templates/',
  'njkSrc' : './templates/pages/**/*.njk',
  'cssSrc' : './assets/styles/**/*.scss',
  'cssDist' : './dist/assets/styles/',
  'jsSrc' : './assets/scripts/**/*.js',
  'jsDist' : './dist/assets/scripts/',
  'imgSrc' : './assets/images/**/**',
  'imgDist' : './dist/assets/images/',
  'publicSrc' : './public/**',
}

const { watch, series, task, src, dest, parallel } = require('gulp');

// nunjucks

function gulpNunjucks() {
  return gulp.src(paths.njkSrc)
  .pipe(nunjucksRender({
    path: paths.template
  }))
  .pipe(gulp.dest(paths.root))
};

//sass

function gulpSass() {
  return (
    src(paths.cssSrc)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(dest(paths.cssDist))
    .pipe(browserSync.stream())
  );
};

//babel

function gulpBabel() {
  return (
    src(paths.jsSrc)
    .pipe(babel(
      {
       presets: ['@babel/env']
      }
    ))
    .pipe(gulp.dest(paths.jsDist))
  );
};

// copy

function imgCopy() {
  return (
    src(paths.imgSrc)
    .pipe(dest(paths.imgDist))
  );
};

function publicCopy() {
  return (
    src(paths.publicSrc)
    .pipe(dest(paths.root))
  );
};

// browser-sync
function serve (cb) {
  browserSync.init(
    {
      open: false,
      server: {
        baseDir: './dist/'
      },
      startPath: ''
    },
    cb
  );
};

// browser-sync reload
function reload(done) {
  browserSync.reload();
  done();
};

//watch
function gulpWatch(done) {
  watch([paths.njkSrc], series(gulpNunjucks, reload));
  watch([paths.cssSrc], gulpSass);
  watch([paths.jsSrc], series(gulpBabel, reload));
  watch([paths.imgSrc], series(imgCopy, reload));
  watch([paths.publicSrc], series(publicCopy, reload));
  done();
};

function clean(cb) {
	fs.rm(
		paths.root,
		{
			force: true,
			recursive: true,
		},
		cb
	)
};


task('default', series(clean, parallel(gulpNunjucks, gulpSass, gulpBabel, imgCopy, publicCopy, gulpWatch, serve)));

task('build', series(clean, parallel(gulpNunjucks, gulpSass, gulpBabel, imgCopy, publicCopy)));

task('serve', serve);