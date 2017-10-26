var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置，dev/online
var WEBPACK_DEV = process.env.WEBPACK_DEV || 'dev';//默认使用dev
console.log(WEBPACK_DEV);
//封装模版函数
var getHtmlConfig = function(name){
    return {
            template:'./src/view/'+ name +'.html',
            filename:'view/'+ name +'.html',
            inject:true,
            hash:true,
            chunks:['common',name],
    }
}
var config = {
     entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
     },
     output: {
         path: path.join(__dirname, '/dist/'),
         publicPath:'/dist',
         filename: 'js/[name].js'
     },
     externals:{
        'jquery':'window.jQuery',//引入jquery插件
     },
    module: {
        loaders:  [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.string$/,
                loader:  'html-loader'
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },//ext  文件扩展名
        ]
    },
    //配置别名
    resolve : {
        alias : {
            util           : __dirname + '/src/util',
            page           : __dirname + '/src/page',
            service        : __dirname + '/src/service',
            image          : __dirname + '/src/image',
            node_modules   : __dirname + '/node_modules',
        }
    },
     plugins:[
     // 提供公共代码// 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
         // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 };
if(WEBPACK_DEV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8888');//在入口文件common后面追加文件，因为每个文件都会加载common，所以在common后面追加
}
 module.exports = config;
