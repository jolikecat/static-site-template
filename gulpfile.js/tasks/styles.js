const paths = require('./paths');

const { src, dest } = require('gulp');
const path = require('path');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');

const common = require('../common');

module.exports = function gulpSass() {
    return (
        src(paths.src.scss)
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
        .pipe(dest(path.join(paths.dist.root, 'assets/styles/')))
        .pipe(common.server.stream())
    );
};