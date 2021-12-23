const browserSync = require('browser-sync').create();

module.exports = function serve (cb) {
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