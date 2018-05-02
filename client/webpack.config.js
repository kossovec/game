'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';
const outDir = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.resolve(__dirname, "../bin/");
const PLATFORM = process.env.PLATFORM || 'desktop';
const isMobile = PLATFORM === 'mobile';

const entries = {};

entries["game"] = `${__dirname}/_src/index.js`;


module.exports = {
    entry: entries,
    output: {
        path: outDir,
        filename: `[name].js`
    },

    watch: false,
    devtool:NODE_ENV === 'development' ? 'source-map': null,

    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            __DEV__: !isProduction,
            __MOBILE__: isMobile,
            __DESKTOP__: !isMobile,
        })
    ]
};