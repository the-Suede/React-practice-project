const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './src/main.js'), //入口文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name]-[hash:5].js' //指定编译后的js文件名字
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        // proxy:服务器代理
        // compress:true 服务器压缩
    },
    resolve: {
        //路径别名
        alias: {
            '@': path.resolve('./src'),
            '$c': path.resolve('./src/components'),
            '$v': path.resolve('./src/views'),
            '$a': path.resolve('./src/assets')
        },
        //默认扩展名
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            //js编译
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, './src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }]
                        ]
                    }
                }
            },
            //css编译
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //sass编译
            {
                test: /\.s[ac]ss$/,
                include: path.join(__dirname, './src'),
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}