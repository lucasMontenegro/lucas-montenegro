const path = require("path")
const nodeExternals = require("webpack-node-externals")
module.exports = {
  mode: process.env.NODE_ENV,
  target: `node`,
  entry: path.resolve(__dirname, `src/local/server.js`),
  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, `server`),
  },
  externals: nodeExternals(),
  resolve: {
    alias: {
      local: path.resolve(__dirname, `src/local`),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel-loader`,
      },
    ],
  },
}