var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function (cb) {
  gulp.watch("src/**/*.js", (cb)=>{
    return gulp.src("src/**/*.js")
    .pipe(babel({
      plugins: ["wildcard"]
    }))
    .pipe(gulp.dest("scripts"));
  })
});