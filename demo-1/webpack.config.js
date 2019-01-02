const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');

module.exports = {
    entry:{
        index: './src/index.js',
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'[name].bundle.js'
    },
    mode:'development',
    devtool:'source-map',
    devServer: {
        contentBase: path.join(__dirname, './server'),
        host: '127.0.0.1',
        port: 8088,
        open: true,
        inline: true,
        hot: true,
        disableHostCheck: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            exclude: ['wth.txt', ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filenamme: 'index.html',
            title: 'index-1!',
            hash: true,
            chunks: ['index'],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    "css-loader",
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:100000,
                        outputPath:'images',
                    },
                },
            },
            {
                test:/\.less$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath: '../',
                    }
                },"css-loader","less-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-env', ],
                    },
                },],
            },
        ],
    },
}