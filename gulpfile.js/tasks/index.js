const paths = require('./paths');

const { watch, series, task, src, dest, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const mode = require('gulp-mode')({
  modes: ["production", "development"],
  default: "development",
  verbose: false
});

const templates = require('./templates');
const clean = require('./clean');
const copy = require('./copy');
const images = require('./images');
const scripts = require('./scripts');
const styles = require('./styles');
const serve = require('./serve');

// browser-sync reload
function reload(cb) {
  browserSync.reload();
  cb();
};

//watch
function gulpWatch(cb) {
  watch([paths.src.njk], series(templates, reload));
  watch([paths.src.scss], styles);
  watch([paths.src.js], series(scripts, reload));
  watch([paths.src.img], series(images, reload));
  watch([paths.src.public], series(copy, reload));
  cb();
};


task('dev', series(clean, parallel(templates, styles, scripts, images, copy), gulpWatch, serve));

task('build', series(clean, parallel(templates, styles, scripts, images, copy)));

task('serve', serve);