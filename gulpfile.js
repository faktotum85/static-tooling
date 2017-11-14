const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('babel', () => {
  gulp.src('src/javascript/main.js')
    .pipe(babel({ // transpile
      presets: ['env']
    }))
    .pipe(uglify()) // then uglify
    .pipe(gulp.dest('dist/javascript'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  gulp.src('src/styles/master.sass')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('views', () => {
  gulp.src('src/views/pages/*.pug') // compile pug templates in views/pages
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist' // server serves up dist directory
    }
  });
});

gulp.task('watch', ['browserSync', 'sass', 'babel', 'views'], () => {
  gulp.watch('src/styles/**/*.sass', ['sass']); // watch sass files and run sass task if they change
  gulp.watch('src/javascript/**/*.js', ['babel']); // watch js files in source and transpile again if they change
  gulp.watch('src/views/**/*.pug', ['views']); // watch pug files and compile templates on change
  gulp.watch('dist/*.html', browserSync.reload); // reload when html files change
});
