const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("fix-esm").require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps')
const cleancss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'src/'},
    notify: false,
    online: true
  })
}

function scripts() {
  return src([
    'src/js/script.js',
  ])
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(dest('build/js/'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(concat('style.min.css'))  
  .pipe(postcss([autoprefixer({overrideBrowserslist: ['last 2 versions']})]))
  .pipe(cleancss( { level: { 1: { specialComments: 0 } } }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('src/css/'))
  .pipe(browserSync.stream())
}

function buildcopy() {
  return src([
    'src/css/**/*.min.css',
    'src/**/*.html',
    'src/img/**/*',
    'src/fonts/*',
  ], {base: 'src'})
  .pipe(dest('build'))
}

function cleanbuild() {
  return src('build', {allowEmpty: true}).pipe(clean())
}

function startwatch() {
  watch(['src/**/*.js', '!app/**/*.min.js'], scripts);
  watch('src/**/*.scss', styles);
  watch('src/**/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.default = parallel(styles, scripts, browsersync, startwatch);
exports.build = series(cleanbuild, styles, scripts, buildcopy);