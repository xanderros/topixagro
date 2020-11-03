const { mix, plugins } = require('laravel-mix');

let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let ExtractTextPlugin = plugins.ExtractTextPlugin

var template = require("./resources/assets/pages/main.pug");

mix
    .webpackConfig({
        module: {
            rules: [{
                test: /\.pug$/,
                use: ExtractTextPlugin.extract({
                    use: "pug-loader"
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin("./resources/assets/pages/main.pug"),
            new FaviconsWebpackPlugin({
                logo: './resources/assets/images/favicons/favicon.svg',
                background: '#fff',
                title: 'Topixagro',
                prefix: 'public/assets/images/favicons/',
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: true
                }
            })
        ]
    })
    .js('resources/assets/js/custom.js', 'public/assets/js/app.js')
    .less('resources/assets/styles/style.less', 'public/assets/css').options({
        processCssUrls: false
    })
    .copy('resources/assets/fonts/roboto/*', 'public/assets/fonts/roboto');