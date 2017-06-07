var gulp = require("gulp");
var run = require("gulp-run");
var runSequence = require("run-sequence");
var del = require("del");

var SRC_PATH = "./";
var BUILD_PATH = "build";
var STATIC_PATH = SRC_PATH + "/static";
var BUILD_STATIC_PATH = BUILD_PATH + "/static"

var RUN_OPTS = {
    verbosity: 3
}

gulp.task("install", function () {
    run("npm install -g http-server", RUN_OPTS).exec();
    run("npm install -g karma-cli", RUN_OPTS).exec();
    run("npm install", RUN_OPTS).exec();
    run("gem install compass --no-ri --no-rdoc", RUN_OPTS).exec();
});

gulp.task("serve", function() {
    return run("http-server " + SRC_PATH + " -p 3333", RUN_OPTS).exec();
});

gulp.task("serve-build", function() {
    return run("http-server " + BUILD_PATH + " -p 8001", RUN_OPTS).exec();
});

gulp.task("watch-css", function() {
    return run("compass watch", RUN_OPTS).exec();
});

gulp.task("compile-css", function() {
    return run("compass compile --force", RUN_OPTS).exec();
});

gulp.task("test", function() {
    return run("karma start", RUN_OPTS).exec();
});

gulp.task("build-clean", function() {
    return del([
            BUILD_PATH + "/*"
        ]);
});

gulp.task("build-require", function() {
    return run("r.js -o build.js dir=" + BUILD_PATH).exec();
});

gulp.task("build-compass", function() {
    return run("compass compile -c config.rb --css-dir " + BUILD_STATIC_PATH + "/css -s compressed --force --quiet").exec();
});

gulp.task("build-finalize", function() {
    return del([
            BUILD_STATIC_PATH + "/scss",
            BUILD_PATH + "/build.txt"
        ]);
});

gulp.task("build", function(callback) {
    runSequence("build-clean", "build-require", "build-compass", "build-finalize", callback);
});

gulp.task("default", function() {
    return gulp.run("serve", "watch-css", function(err) {
        console.log(err);
    });
});