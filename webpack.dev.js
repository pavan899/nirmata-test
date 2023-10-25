const { merge } = require('webpack-merge');
const common = require('./webpack.main.js');
const TerserPlugin = require('terser-webpack-plugin');
const port = process.env.port || 3000;

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    }
});
