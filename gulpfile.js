const gulp = require("gulp")
const esbuild = require("gulp-esbuild")
const exec = require("child_process").exec

function bundle() {
  return gulp
    .src("./src/index.ts")
    .pipe(
      esbuild({
        outfile: "bundle.js",
        sourcemap: "inline",
        bundle: true,
        target: ["chrome60", "firefox55", "safari11", "edge18"],
        loader: {
          ".ts": "ts",
          ".json": "json",
        },
      })
    )
    .pipe(gulp.dest("./dist/"))
}

function copyPublic() {
  return gulp.src("public/**/*").pipe(gulp.dest("./dist"))
}

function watch() {
  exec("reload -b --dir=dist --port=5000", (err) => {
    if (err) throw err
  })
  return gulp.watch("src/**/*.ts", gulp.series(bundle, copyPublic))
}

exports.bundle = gulp.series(bundle, copyPublic)
exports.watch = gulp.series(bundle, copyPublic, watch)
