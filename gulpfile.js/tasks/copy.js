const paths = require('./paths');

const { src, dest } = require('gulp');

module.exports = function copy() {
    return (
        src(paths.src.public)
        .pipe(dest(paths.dist.root))
    );
};