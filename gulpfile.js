const { watch } = require('chokidar');
const {src,dest, parallel} = require('gulp'),
      sass = require('gulp-sass'),
      gcmq = require('gulp-group-css-media-queries'),
      autoprefixer = require('gulp-autoprefixer')
      pug = require('gulp-pug-3');
page = {
    build:{
        //ввывод файлов
        html:'build/',
        style:'build/css/',
        js:'build/js/',
        img:'build/img/',
        fonts:'build/fonts/'
    },

    src:{
        //ввод файлов
        pugfile:'src/index.pug',
        style:'src/scss/*.scss',
        js:'src/js/*.js',
        img:'src/img/*.*',
        fonts:'src/fonts/*.ttf'
    }
}


function style(){
    return src(page.src.style)
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(dest(page.build.style))
}

function html(){
    return src(page.src.pugfile)
    .pipe(pug({pretty:true}))
    .pipe(dest(page.build.html))
}

function img(){
    return src(page.src.img)
    .pipe(dest(page.build.img))
}

function js(){
    return src(page.src.js)
    .pipe(dest(page.build.js))
}

function fonts(){
    return src(page.src.fonts)
    .pipe(dest(page.build.fonts))
}

exports.style = style;
exports.img = img;
exports.html = html;
exports.js = js;
exports.fonts = fonts;

exports.default = parallel(style,js,img,html,fonts);