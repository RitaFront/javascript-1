"use strict";

const { src, dest, watch, series } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const del = require("del");
const htmlMin = require("gulp-htmlmin");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const webp = require("gulp-webp");
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

const buildProd = process.argv.includes("--prod");

//Paths
const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    css: distPath + "assets/css/",
    js: distPath + "assets/js/",
    images: distPath + "assets/images/",
    fonts: distPath + "assets/fonts/",
    libs: distPath + "assets/libs/",
  },
  src: {
    html: srcPath + "*.html",
    css: srcPath + "assets/scss/**/*.scss",
    js: srcPath + "assets/js/*.js",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json,jpeg}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
    libs: srcPath + "assets/libs/*.js",
  },
  watch: {
    html: srcPath + "**/*.html",
    css: srcPath + "assets/scss/**/*.scss",
    js: srcPath + "assets/js/**/*.js",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json,jpeg}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
    libs: srcPath + "assets/libs/*.js",
  },
  clean: "./" + distPath,
};

function htmlInclude() {
  return src(["src/*.html"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return (
    src(path.src.css, { base: srcPath + "assets/scss/" })
      .pipe(sourcemaps.init())
      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "SCSS Error",
              message: "Error: <%= error.mesage %>",
            })(err);
            this.emit("end");
          },
        })
      )
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssbeautify())
      .pipe(
        cssnano({
          zindex: false,
          discardComments: {
            removeAll: true,
          },
        })
      )
      .pipe(removeComments())
      // .pipe(concat('style.css'))
      .pipe(
        rename({
          suffix: ".min",
          extname: ".css",
        })
      )
      .pipe(gulpIf(!buildProd, sourcemaps.write()))
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream())
  );
}

function js() {
  return src(["src/assets/js/components/**/*.js", "src/assets/js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "JS Error",
            message: "Error: <%= error.mesage %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(gulpIf(!buildProd, sourcemaps.write()))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function imageWebp() {
  return src(path.src.images, { base: srcPath + "assets/images/" })
    .pipe(webp())
    .pipe(dest(path.build.images));
}

function images() {
  return src(path.src.images, { base: srcPath + "assets/images/" })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images));
}

function fonts() {
  return src(path.src.fonts, {
    base: srcPath + "assets/fonts/",
  }).pipe(dest(path.build.fonts));
}

function libs() {
  return src(path.src.libs, {
    base: srcPath + "assets/libs/",
  }).pipe(dest(path.build.libs));
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

function clean() {
  return del(path.clean);
}

watch(path.src.html, htmlInclude);
watch("src/html/*.html", htmlInclude);
watch(path.src.css, css);
watch(path.src.js, js);

// exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.libs = libs;
exports.clean = clean;
exports.imageWebp = imageWebp;
exports.default = series(
  clean,
  fonts,
  libs,
  htmlInclude,
  js,
  css,
  imageWebp,
  images,
  watchFiles
);
