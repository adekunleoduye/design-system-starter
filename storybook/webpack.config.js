const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../components'),
        use: {
          loader: 'babel-loader', 
          options: {
          "presets": ["@babel/preset-env"]

          }
        }
      },
    ],
    resolve: {
      modules: ['node_modules']
    }
  },
}