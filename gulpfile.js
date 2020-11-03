/* gulp tasks */
var gulp = require('gulp');
var pug = require('gulp-pug');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var path = require('path');
var svgSprite = require('gulp-svg-sprite');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

var srcLess = [
    './bower_components/toastr/toastr.less',
    './resources/assets/index/styles/style.less',
    './bower_components/fotorama/fotorama.css',
    './bower_components/magnific-popup/dist/magnific-popup.css',
    './bower_components/select2/dist/css/select2.min.css',
    './resources/assets/index/styles/plugins/froala.css',
    './node_modules/flatpickr/dist/flatpickr.css'
];

var srcPug = './resources/assets/index/pages/*.pug';

// less to css
gulp.task('lesss', function () {
    return gulp.src(srcLess)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/assets/index/css'));
});

// pug to html
gulp.task('pug', function () {
    return gulp.src(srcPug)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/markup'));
});

// png sprite
gulp.task('sprite', function () {
    var spriteData =
        gulp.src('./resources/assets/index/images/sprite/*.png')
            .pipe(spritesmith({
                retinaSrcFilter: ['./resources/assets/index/images/sprite/*@2x.png'],
                imgName: 'sprite.png',
                imgPath: '../images/sprite/sprite.png',
                retinaImgName: 'sprite@2x.png',
                retinaImgPath: '../images/sprite/sprite@2x.png',
                cssName: 'sprite.less',
                cssFormat: 'less',
                padding: 6,
                algorithm: 'top-down'
            }));
    spriteData.img.pipe(gulp.dest('./public/assets/index/images/sprite/'));
    spriteData.css.pipe(gulp.dest('./resources/assets/index/styles/components/'));
});

// SVG sprite
gulp.task('svgSpriteBuild', function () {
    return gulp.src('./resources/assets/index/images/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                // $('[fill]').removeAttr('fill');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                },
                css: {
                    render: {
                        css: true
                    }
                }
            }
        }))
        .pipe(gulp.dest('./public/assets/index/images/svg/'));
});

// --------- elixir tasks ----------

var elixir = require('secret-elixir');

elixir.config.sourcemaps = false;
// elixir.config.css.base64.enabled = true;

elixir(mix => {
    let
        resources = './resources/assets/',
        public = './public/assets/',
        bower = './bower_components/';
    mix
    // Index
        .task('svgSpriteBuild')
    //     .less([
    //         `./node_modules/flatpickr/dist/flatpickr.css`,
    //         `${resources}index/styles/custom.less`
    //     ], `${public}index/css/style.css`)

        .task('pug', [
            `${resources}index/pages/*.pug`,
            `${resources}index/blocks/**/*.pug`
        ])

        .task('lesss', [
            `${resources}index/styles/style.less`,
            `${resources}index/styles/custom.less`,
            `${resources}index/blocks/**/*.less`
        ])
        .scripts([
            `${bower}jquery/dist/jquery.min.js`,
            `${bower}select2/dist/js/select2.js`,
            `${bower}fotorama/fotorama.js`,
            `${bower}magnific-popup/dist/jquery.magnific-popup.min.js`,
            `${bower}slick-carousel/slick/slick.min.js`,
            `${bower}vide/dist/jquery.vide.min.js`,
            `${bower}jquery-form/src/jquery.form.js`,
            `${bower}toastr/toastr.min.js`,
            `${bower}jquery.scrollTo/jquery.scrollTo.min.js`,
            `${bower}youtubeBackground/src/jquery.youtubebackground.js`,
            `./node_modules/smtlk-dotdotdot/src/jquery.dotdotdot.min.js`,
            `./node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js`,
            `./node_modules/flatpickr/dist/l10n/ru.js`,
            `./node_modules/flatpickr/dist/flatpickr.js`,
            `${resources}index/js/custom.js`,
            `${resources}index/blocks/**/*.js`
        ], `${public}index/js/main.js`)

        .copy(`${resources}index/images`, `${public}index/images`)
        .copy(`${resources}index/images`, `${public}../build/assets/index/images`)
        .copy(`${resources}index/fonts`, `${public}/index/fonts`)
        .copy(`${resources}index/fonts`, `${public}../build/assets/index/fonts`)

        .browserify(`${resources}index/js/app/app.js`, `${public}index/js/app.js`)

        //Admin
        .less([
            `${resources}admin/less/styles.less`,
            `${bower}At.js/dist/css/jquery.atwho.css`,
        ], `${public}admin/css/styles.css`)

        .scripts([
            `${bower}jquery-pjax/jquery.pjax.js`,
            `${bower}jquery.scrollTo/jquery.scrollTo.min.js`,
            `${bower}Caret.js/dist/jquery.caret.js`,
            `${bower}At.js/dist/js/jquery.atwho.js`,
        ], `${public}admin/js/libs.js`)

        .browserify(`${resources}admin/js/index.js`, `${public}admin/js/scripts.js`)

        .version([
            `${public}index/js/main.js`,
            `${public}index/js/app.js`,
            `${public}index/css/style.css`,
            `${public}admin/css/styles.css`,
        ])
});
