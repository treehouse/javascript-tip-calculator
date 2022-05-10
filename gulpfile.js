const { src, dest, series, watch } = require('gulp')
const scssCompile = require('gulp-sass')(require('sass'))
const addCssPrefixer = require('gulp-autoprefixer')
const cssMinify = require('gulp-clean-css')
const scriptsMinify = require('gulp-terser')
const browsersync = require('browser-sync').create();

function styles() {
    return src('./frontend/src/styles/**/*.scss')
        .pipe(scssCompile())
        .pipe(addCssPrefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(dest('./frontend/dist/styles'))
}

function scripts() {
    return src('./frontend/src/scripts/app.js')
        .pipe(scriptsMinify())
        .pipe(dest('./frontend/dist/scripts'))
}

function browsersyncServe(cb) {
    browsersync.init({ server: { baseDir: '.' }})
    cb()
}

function browsersyncReload(cb) {
    browsersync.reload()
    cb()
}

function watchTask() {
    watch('*.html', browsersyncReload)
    watch([
        './frontend/src/styles/**/*.scss',
        './frontend/src/scripts/**/*.js'], 
        series(styles, scripts, browsersyncReload))
}

exports.default = series(
    styles, 
    scripts,
    browsersyncServe,
    watchTask
)

