const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.tsx`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/../static`
  },
  plugins: [
    new CompressionPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  // externals: {
  //   'react-dom': 'ReactDOM',
  //   'react': 'React',
  //   'axios': 'axios'
  // },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,

      // },
      {
        test: /\.[jt]sx?/,
        include: `${__dirname}/src`,
        use: 'babel-loader',
      }
    ]
  }
};