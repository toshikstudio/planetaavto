var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');

gulp.task('sass', function () {
   return gulp.src('./resources/sass/*.sass')
    .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
    .pipe(cssnano({zindex: false}))
    //.pipe(rename("app.min.css"))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('scss', function () {
    return gulp.src('./resources/sass/*.scss')
     .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
     .pipe(cssnano())
     .pipe(gulp.dest('./public/css'))
 });
 
gulp.task('watch',function () {
	gulp.watch("./resources/sass/*.sass",gulp.series('sass'));
	gulp.watch("./resources/sass/*.scss",gulp.series('scss'));
})

gulp.task('default',gulp.series('watch'))
