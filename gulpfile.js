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
const twig = require('gulp-twig');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagecomp = require('compress-images');
const {deleteSync} = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'public/'},
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
    .pipe(dest('public/js/'))
    .pipe(browserSync.stream())
}

function compileTwig() {
  return src(['src/**/*.twig', '!./src/includes/*.twig'])
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return {
          title: 'Twig Error',
          message: error.message
        };
      })
    }))
    .pipe(twig())
    .pipe(dest('public'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(concat('style.min.css'))
  .pipe(postcss([autoprefixer({overrideBrowserslist: ['last 2 versions']})]))
  .pipe(cleancss( { level: { 1: { specialComments: 0, format: 'beautify' } } }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('public/css/'))
  .pipe(browserSync.stream())
}

function images() {
  imagecomp(
    'src/img/**/*',
    'public/img/',
    { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
    { png: { engine: 'pngquant', command: ['--quality=75-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    function (err, completed) {
      if (completed === true) {
        browserSync.reload()
      }
    }
  )
}

function fonts() {
  return src('src/fonts/**/*')
  .pipe(dest('public/fonts'))
}

function buildcopy() {
  return src([
      'src/css/**/*.min.css',
      'src/**/*.twig',
      'src/img/**/*',
      'src/fonts/*',
    ], {base: 'src'})
    .pipe(dest('build'))
}

function cleanbuild() {
  return src('build', {allowEmpty: true}).pipe(clean())
}

async function copyResources() {
  images()
  fonts()
}

async function cleanRes() {
  return deleteSync(['public/*'])
}

function startwatch() {
  watch('src/**/*.js', scripts);
  watch('src/**/*.scss', styles);
  watch('src/**/*.twig', compileTwig);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.compileTwig = compileTwig;
exports.styles = styles;
exports.copyResources = copyResources;
exports.cleanRes = cleanRes;
exports.default = parallel(cleanRes, copyResources, browsersync, scripts, compileTwig, styles, startwatch);
exports.build = series(cleanbuild, scripts, compileTwig, buildcopy);
