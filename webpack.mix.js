// webpack.mix.js
let mix = require('laravel-mix');

// Compile Modern JavaScript & Sass
mix.js('src/js/app.js', 'js')
    .sass('src/sass/main.scss', 'css').options({
        processCssUrls: false
    })
    .setPublicPath('dist');

// Disable success notifications
mix.disableSuccessNotifications();