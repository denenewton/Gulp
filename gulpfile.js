const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

var paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "assets/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "assets/js/",
  },
  images: {
    src: "src/img/**/*.{png,jpg}",
    dest: "assets/img/",
  },
  markup: {
    src: "./*.html",
    dest: "assets/",
  },
};

function jsTask() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest(paths.scripts.dest, { sourcemaps: "." }));
}

// Sass Task
function scssTask() {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest, { sourcemaps: "." }));
}

function copyImage() {
  return src(paths.images.src).pipe(dest(paths.images.dest));
}

function copyHTML() {
  return src(paths.markup.src).pipe(dest(paths.markup.dest));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTasks() {
  watch(paths.markup.src, 
    series(copyHTML, browserSyncReload));
  watch(
    [paths.styles.src, paths.scripts.src],
    series(scssTask, jsTask, browserSyncReload)
  );
}

exports.default = series(
  scssTask,
  jsTask,
  copyHTML,
  copyImage,
  browserSyncServe,
  watchTasks
);

exports.build = series(scssTask, jsTask, copyHTML);
