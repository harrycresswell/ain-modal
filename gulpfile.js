// Require modules
var gulp          = require('gulp');
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var autoprefixer  = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');


// Outputs error in terminal instead of breaking file
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


// Scripts task to uglify the js
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream:true}));
});


// Sass task to compile the css
gulp.task('sass', function(){
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'})
    .on('error', errorLog))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({stream:true}));
});

// HTML task watches html for changes
gulp.task('html', function(){
  gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
});


// BrowserSync task reloads the browser
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: "./app/"
    }
  });
});


// Watch task watches files for change
gulp.task('watch', function(){
  gulp.watch('src/js/*js', ['scripts']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['html']);
});


// Default task runs everything when you run 'gulp'
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
