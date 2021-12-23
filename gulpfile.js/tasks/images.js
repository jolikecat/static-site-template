const paths = require('./paths');

const { src, dest } = require('gulp');
const path = require('path');

module.exports = function gulpImages() {
    return (
        src(paths.src.img)
        .pipe(dest(path.join(paths.dist.root, 'assets/images/')))
    );
};