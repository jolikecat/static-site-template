const common = require('../common');

module.exports = function serve (cb) {
    common.server.init(
        {
        open: false,
        server: './dist/',
        startPath: '/',
        ui: false,
        notify: true
        },
        cb,
    );
};