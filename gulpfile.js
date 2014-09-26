var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var nib = require('nib');

var paths = {
  vendors: ['bower_components/jquery/dist/jquery.min.js',
    'bower_components/handlebars/handlebars.min.js',
    '.bowercomponents/ember/ember.min.js'],
  scripts: ['assets/js/*.js'],
  styles: ['assets/stylesheets/*.styl'],
  jsDest: 'public/js/',
  cssDest: 'public/stylesheets/'
};

var fileNames = {
  application: 'app.js',
  vendors: 'vendors.min.js',
  scripts: 'main.js'
};

gulp.task('vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(concat(fileNames.vendors))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDest));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(watch(function(files) {
      return files.pipe(concat(fileNames.scripts))
        .pipe(gulp.dest(paths.jsDest));
    }));
});

gulp.task('webserver', function () {
  nodemon({ script: fileNames.application})
  .on('restart', function() {
    console.log('Server Has Restarted');
  });
});

gulp.task('stylus', function() {
  gulp.src(paths.styles)
    .pipe(watch(function(files) {
      return files.pipe(stylus({use: nib(), compress: true}))
        .pipe(gulp.dest(paths.cssDest));
    }));
});

gulp.task('default', function() {
  gulp.start('vendors', 'scripts', 'stylus', 'webserver');
});
