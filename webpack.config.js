const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/script.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: true
        }),
    ],
};
