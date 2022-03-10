const paths = require('./paths');

const { src, dest } = require('gulp');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../../webpack.config.js');

module.exports = function gulpScript() {
    return webpackStream(webpackConfig, webpack).on('error', function (e) {
        this.emit('end');
    })
    .pipe(dest(path.join(paths.dist.root, 'assets/scripts/')))
};