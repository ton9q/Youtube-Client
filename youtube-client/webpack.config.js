const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    // path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            // options: { minimize: true }
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/html/index.html',
      // filename: "./index.html"
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1902,
    historyApiFallback: true,
  },
};
