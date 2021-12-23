const paths = require('./paths');

const { src, dest } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');

module.exports = function gulpNunjucks() {
    return src(paths.src.njk)
    .pipe(nunjucksRender({
        path: paths.src.templates
    }))
    .pipe(dest(paths.dist.root))
};