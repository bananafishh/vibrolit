'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

const pug = require('gulp-pug');

const scss = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob-use-forward');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const cleanCSS = require('gulp-clean-css');

// const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
// const sourcemaps = require('gulp-sourcemaps');

const server = require('browser-sync').create();
// const remember = require('gulp-remember');
const rimraf = require('gulp-rimraf');
// const args = require('yargs').argv;
// const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');

const srcPath = './source/';
const buildPath = './build/';


// Сборка pug
// gulp.task('markup', () => {
//   return gulp.src(srcPath + 'pages/**/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest(buildPath))
// });

function buildMarkup(cb) {
  gulp.src(srcPath + 'pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPath));

  cb();
}


// Сборка стилей
// gulp.task('styles', () => {
//   return gulp.src(srcPath + 'styles/main.scss')
//     .pipe(plumber())
//     .pipe(gulpif(!args.production, sourcemaps.init()))
//     .pipe(sassGlob())
//     .pipe(sass())
//     .pipe(postcss([autoprefixer()]))
//     .pipe(gulpif(args.production, cleanCSS()))
//     .pipe(gulpif(!args.production, sourcemaps.write('.')))
//     .pipe(gulp.dest(buildPath + 'styles/'))
//     .pipe(server.stream());
// });

function buildStyles(cb) {
  gulp.src(srcPath + 'styles/main.scss')
    .pipe(plumber())
    .pipe(concat('main.min.css'))
    .pipe(sassGlob())
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(buildPath + 'styles/'))
    .pipe(server.stream()) // Auto-injecting styles into browser

  cb();
}

// Сборка скриптов
// gulp.task('scripts', () => {
//   return gulp.src(srcPath + '/**/*.js', {since: gulp.lastRun('scripts')})
//     .pipe(plumber())
//     .pipe(gulpif(!args.production, sourcemaps.init()))
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(gulpif(args.production, uglify()))
//     .pipe(remember('scripts'))
//     .pipe(concat('main.js'))
//     .pipe(gulpif(!args.production, sourcemaps.write('.')))
//     .pipe(gulp.dest(buildPath + 'scripts/'));
// });
function buildScripts(cb) {
  gulp.src(srcPath + '/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + 'scripts/'));

  cb();
}


// Копирование шрифтов
// gulp.task('fonts', () => {
//   return gulp.src(srcPath + 'fonts/**/*.{woff,woff2}', {since: gulp.lastRun('fonts')})
//     .pipe(gulp.dest(buildPath + 'fonts/'));
// });
function buildFonts(cb) {
  gulp.src(srcPath + 'fonts/**/*.{woff,woff2}', { since: gulp.lastRun(buildFonts) })
    .pipe(gulp.dest(buildPath + 'fonts/'));

  cb();
}


// Копирование изображений
// gulp.task('images', () => {
//   return gulp.src(srcPath + 'img/*', {since: gulp.lastRun('images')})
//     .pipe(gulp.dest(buildPath + 'img/'));
// });

function buildImages(cb) {
  gulp.src(srcPath + 'img/*')
    .pipe(gulp.dest(buildPath + 'img/'));

  cb();
}


// Удаление содержимого папки сборки
// gulp.task('clean', () => {
//   return del(buildPath + '**');
// });
function clean(cb) {
  gulp.src(buildPath, { read: false, allowEmpty: true })
    .pipe(rimraf());

  cb();
}


// Сборка всего проекта
// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel('styles', 'scripts', 'fonts', 'images'),
//   'markup'
// ));
function build(cb) {
  (gulp.series(
    clean,
    gulp.parallel(buildStyles, buildScripts, buildFonts, buildImages),
    buildMarkup,
  ))();

  cb();
}


// Следим за изменениями, перезагружаем браузер
// gulp.task('serve', gulp.series('build', () => {
//   server.init({
//     server: 'build',
//     open: true
//   });

//   gulp.watch(srcPath + '**/*.pug', gulp.series('markup', reload));
//   gulp.watch(srcPath + '**/*.scss', gulp.series('styles'));
//   gulp.watch(srcPath + '/**/*.js', gulp.series('scripts', reload));
//   gulp.watch(srcPath + 'img/*', gulp.series('images'), reload);
// }));

function serve(cb) {
  (gulp.series(build, () => {
    server.init({
      server: 'build',
      open: true,
    });
  
    gulp.watch(srcPath + '**/*.pug', gulp.series(buildMarkup, reload));
    gulp.watch(srcPath + '**/*.scss', buildStyles);
    gulp.watch(srcPath + '**/*.js', gulp.series(buildScripts, reload));
    gulp.watch(srcPath + 'img/*', gulp.series(buildImages, reload));
  }))();

  cb();
}

function reload(done) {
  server.reload();
  done();
}

exports.buildStyles = buildStyles;
exports.buildMarkup = buildMarkup;
exports.buildImages = buildImages;
exports.buildScripts = buildScripts;
exports.buildFonts = buildFonts;
exports.clean = clean;

// exports.build = gulp.series(
//   deleteFolder,
//   gulp.parallel(buildStyles, buildScripts, buildFonts, buildImages),
//   buildMarkup,
// );

exports.build = build;

exports.serve = serve;
