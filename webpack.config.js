var path = require('path');
var ENTRY_DIR = path.join(__dirname, '/client/src');
var OUTPUT_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: ENTRY_DIR + '/index.jsx',
  output: {
    filename: 'bundle.js',
    path: OUTPUT_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: ENTRY_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
