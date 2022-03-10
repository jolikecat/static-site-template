const path = require("path");
const glob = require("glob");

const srcDir = "./assets/scripts";
const entries = glob
  .sync("**/*.js", {
    ignore: "**/_*.js",
    cwd: srcDir,
  })
  .map(function (key) {
    // [ '**/*.js' , './src/**/*.js' ]という形式の配列になる
    return [key, path.resolve(srcDir, key)];
  });

// 配列→{key:value}の連想配列へ変換
const entryObj = Object.fromEntries(entries);

module.exports = {
  mode: 'development',
  entry: entryObj,
  output: {
    path: path.join(__dirname, "dist/assets/scripts"),
    filename: "[name]",
  },

  module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
              presets: [
                "@babel/preset-env",
              ],
						},
					},
				],
			},
		],
	},

  target: ["web", "es5"],

  resolve: {
		alias: {
			'~': __dirname,
		},
	},

  optimization: {
    runtimeChunk: {
      name: 'runtime.js',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
				defaultVendors: false,
        vendors: {
          minSize: 0,
          name: 'vendors.js',
          test: /node_modules/,
        }
      }
    }
  }
};