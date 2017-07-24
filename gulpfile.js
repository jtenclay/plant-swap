var gulp = require("gulp");
var less = require("gulp-less");
var watch = require("gulp-watch");

gulp.task("watch", function() {
	gulp.watch(["./client/plant-swap/src/*.less"], ["compile-less"])
});

gulp.task("compile-less", function(){
	gulp.src("./client/plant-swap/src/*.less")
	.pipe(less())
	.pipe(gulp.dest("./client/plant-swap/src"));
});

gulp.task("default", ["compile-less","watch"]);