const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'J.A.T.E.',
        template: './index.html'
      }),
      new WebpackPwaManifest ({
        name: "Just Another Text Editor",
        short_name: 'J.A.T.E.',
        description: 'Taking notes with JS',
        inject: true,
        fingerprints: false,
        background_color: '#B8B8B8',
        theme_color: "B8B8B8",
        start_url: "./",
        publicPath: "./",
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96,128,192],
          destination: path.join('assets', 'icons')
        }],
      }),
    ],
    module: {
      rules: [
        {
          use: ['style-loader', 'css-loader'],
          test: /\.css$/i,
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              presets: ['@babel/preset-env'],
            },
          },
        },
      ]},
  };
};