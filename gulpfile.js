var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: "./sass/**/*.*",
        dest: "./assets/css"
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
			baseDir: './'
		},
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(['*.html', './assets/js/*.js']).on('change', browserSync.reload);
}

exports.watch = watch
exports.style = style;
var build = gulp.parallel(style, watch);
gulp.task('default', build);