const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminJpg = require('imagemin-jpeg-recompress');
const cache = require('gulp-cache'); // for caching image-optimization
const del = require('del'); // for cleaning out the dist folder
const runSequence = require('run-sequence').use(gulp); // for ensuring clean:dist has finished
// const sourcemaps = require('gulp-sourcemaps');


const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('babel', () => {
  return gulp.src('src/javascript/main.js')
    .pipe(babel({ // transpile
      presets: ['env']
    }))
    .pipe(uglify()) // then uglify
    .pipe(gulp.dest('dist/javascript'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src('src/styles/master.sass')
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    // .pipe(sourcemaps.write()) // add sourcemaps to the CSS (inline)
    .pipe(autoprefixer()) // append required vendor prefixes (using default targets)
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('views', () => {
  return gulp.src('src/views/pages/*.pug') // compile pug templates in views/pages
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// reload once views are recompiled
gulp.task('update-views', ['views'], () => {
  return browserSync.reload();
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin([imagemin.gifsicle(), imagemin.optipng(), imagemin.svgo(), imageminJpg()]))) // caching processed images
    .pipe(gulp.dest('dist/images'))
});

gulp.task('browserSync', ['sass', 'babel', 'views', 'images'], () => {
  return browserSync.init({
    server: {
      baseDir: 'dist' // server serves up dist directory
    }
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/styles/**/*.sass', ['sass']); // watch sass files and run sass task if they change
  gulp.watch('src/javascript/**/*.js', ['babel']); // watch js files in source and transpile again if they change
  gulp.watch('src/views/**/*.pug', ['update-views']); // watch pug files and update views on change
  gulp.watch('src/images/**/*', ['images']); // watch images folder and optimize if there is a new one
});

// clean out dist folder
gulp.task('clean:dist', () =>{
  del.sync('dist');
})

// for clearing the cache
gulp.task('clear', () =>
  cache.clearAll()
);

gulp.task('default', () => {
  runSequence('clean:dist', 'watch')
});
