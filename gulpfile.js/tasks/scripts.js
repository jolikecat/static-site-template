const paths = require('./paths');

const { src, dest } = require('gulp');
const path = require('path');
const babel = require('gulp-babel');

module.exports = function gulpBabel() {
    return (
        src(paths.src.js)
        .pipe(babel(
        {
            presets: ['@babel/env']
        }
    ))
        .pipe(dest(path.join(paths.dist.root, 'assets/scripts/')))
    );
};