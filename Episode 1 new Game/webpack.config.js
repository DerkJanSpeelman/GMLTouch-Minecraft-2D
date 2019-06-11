const webpack = require('webpack');
const {resolve, join} = require('path');
 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
const OUTPUT_PATH = resolve(__dirname, 'dist');
 
const ENV = process.argv.find((arg) => arg.includes('NODE_ENV=production')) ? 'production' : 'development';
const IS_DEV_SERVER = process.argv.find((arg) => arg.includes('webpack-dev-server'));
 
const devRules = [{
    test: /\.pug$/,
    use:  [
        {
            loader: 'html-loader',
            options: {
                minimize: false,
                removeComments: false,
            }
        },
        {
            loader: 'pug-html-loader',
            options: {
                pretty: true
            }
        }
    ]
}, {
    test: /\.sass$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: ENV === 'development',
            }
        },
        'css-loader',
        'postcss-loader',
        {
            loader: 'sass-loader',
            options: {
                outputStyle: ENV === 'development' ? 'expanded' : 'compressed'
            }
        }
    ],
}, {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
}];
 
const ProdRules = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [[
                '@babel/preset-env',
                {
                    targets: {
                        browsers: [
                            '>=1%',
                            'not ie 11',
                            'not op_mini all',
                        ],
                    },
                    debug: IS_DEV_SERVER ? true : false,
                },
            ]],
        },
    },
}];
 
const buildRules = ENV === 'development' ? devRules : devRules.concat(ProdRules);
 
const config = {
    mode: ENV,
    entry: './src/index.ts',
    module: {
        rules: buildRules
    },
    output: {
        path: OUTPUT_PATH,
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolve(OUTPUT_PATH, 'index.html'),
            template: './src/index.pug',
            minify: {
                collapseWhitespace: ENV === 'production',
            }
        }),
        new MiniCssExtractPlugin({
            filename: ENV === 'production' ? '[name].min.css' : '[name].css',
            chunkFilename: '[id].css'
        })
    ],
}
 
module.exports = config;