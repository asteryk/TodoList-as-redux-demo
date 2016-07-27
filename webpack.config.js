'use strict';
var webpack = require('webpack');
var OpenPackPlugin = require('openpack');
module.exports = {

    output: {
        filename: './assets/app.js',
        publicPath: './assets/',
        path: __dirname + '/dist/'
    },

    cache: true,
    debug: true,
    devtool: 'sourcemap',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/js/index.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/src/styles',
            'images': __dirname + '/src/images/'
        }
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015&presets[]=react']
        }, {
            test: /\.sass/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|eot|ttf|svg|woff|woff2)(\?.*)?$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new OpenPackPlugin({
            host: 'localhost', // the host of URL. Default is `devServer.host` or 'localhost'
            port: '9163', // the port of URL. Default is `devServer.port` or '8080',
            path: 'webpack-dev-server/index.html' // the full path of URL. Default is '/'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

};