const paths = require('./paths');

const fs = require('fs');

module.exports = function clean(cb) {
	fs.rm(
		paths.dist.root,
		{
			force: true,
			recursive: true,
		},
		cb
	)
};