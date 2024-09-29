const { src, dest } = require("gulp");
const gulp = require("gulp");


const sass = require('gulp-sass')(require('sass'));
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const browserSync = require("browser-sync").create();
const autoprefixer = require('gulp-autoprefixer')
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");


function minifyHTML() {
  return src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
}

function minifySCSS() {
  return src("./src/scss/**.scss")
  .pipe(sass())
    .pipe(csso())
    .pipe(autoprefixer())
    .pipe(concat('style.min.css'))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }));
}

function images(){
    return src("src/images/*.{jpeg,png,ico,svg}")
    .pipe(imagemin())
    .pipe(dest("./dist/images"))
}

function watchFile() {
  gulp.watch(["src/index.html"], minifyHTML);
  gulp.watch(["src/scss/**.scss"], minifySCSS);
  gulp.watch(["src/js/main.js"], scripts);
  gulp.watch(["src/images/*.{jpeg,png,ico,svg}"], images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
}

function clean() {
  return del("dist");
}

const build = gulp.series(clean, gulp.parallel(minifyHTML, minifySCSS, scripts, images));
const watch = gulp.parallel(build, watchFile, serve);

exports.minifyHTML = minifyHTML;
exports.minifySCSS = minifySCSS;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.serve = serve;

exports.build = build;
exports.watch = watch;
exports.default = watch;