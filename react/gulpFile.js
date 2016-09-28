"use strict";

const del = require("del");

const gulp = require("gulp");
//const sourceMaps = require("gulp-sourcemaps"); // Not used but ready to do so

const jsHint = require("gulp-jshint");
const htmlLint = require("gulp-htmllint");
const lessHint = require("gulp-lesshint");

const concat = require("gulp-concat");
const less = require("gulp-less");

// Modules for Browserify: converts ES6 JS and React JSX to ES5 JS
const browserify = require("browserify");
const vinylSource = require("vinyl-source-stream");
const vinylBuffer = require("vinyl-buffer");
const globby = require("globby");
const through = require("through2");
const gutil = require("gulp-util");

const uglify = require("gulp-uglify");
const htmlMin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");



const src = "src";
const dest = "dist";





gulp.task("default", ["watch"]);
gulp.task("lint", ["jsHint", "htmlLint", "lessHint"]);
gulp.task("build", ["browserify", "copyHtml", "less", "copyAssets"]);
gulp.task("min", ["browserifyMin", "htmlMin", "lessMin", "copyAssets"]);





gulp.task("clean", () => {
	return del([`${dest}`]);
});





gulp.task("watch", ["lint", "build"], () => {
	gulp.watch([`gulpFile.js`, `${src}/**`], ["lint", "build"]);
});





// Lint

gulp.task("jsHint", function() {
	return gulp.src(`${src}/js/*.js`)
		.pipe(jsHint({
			lookup: false,
			
			// http://jshint.com/docs/options
			// https://github.com/jshint/jshint/blob/master/examples/.jshintrc
			camelcase: true,
			devel: true,
			immed: true,
			latedef: true,
			newcap: true,
			nonew: true,
			quotmark: true,
			
			browser: true,
			jasmine: true,
			node: true
		}))
		.pipe(jsHint.reporter("jshint-stylish"))
		.pipe(jsHint.reporter("fail"));
});

gulp.task("htmlLint", function() {
	return gulp.src([`${src}/index.htm`])
		.pipe(htmlLint()); // http://validator.github.io/validator/#options
});

gulp.task("lessHint", function() {
	return gulp.src([`${src}/style/*.less`, `${src}/reactComponents/**/*.less`])
		.pipe(lessHint())
		.pipe(lessHint.reporter());
});





// Build

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-with-globs.md
// https://www.npmjs.com/package/gulp-browserify // Deprecated
gulp.task("browserify", function () {
	const bundledStream = through(); // gulp expects tasks to return a stream, so we create one here.
	bundledStream // turns the output bundle stream into a stream containing the normal attributes gulp plugins expect
		.pipe(vinylSource("app.js"))
		.pipe(vinylBuffer())
		//.pipe(sourceMaps.init({loadMaps: true}))
		.on("error", gutil.log)
		//.pipe(sourceMaps.write("./"))
		.pipe(gulp.dest(`${dest}`));
	
	globby([// "globby" replaces the normal "gulp.src" as Browserify creates its own readable stream.
		`${src}/js/redux/*.js`,
		`${src}/reactComponents/**/*.jsx`,
		`${src}/js/main.jsx`,
		`!${src}/reactComponents/**/*.spec.jsx`
	]).then(function (entries) {
		browserify({
			entries: entries,
			debug: false, // "true" writes a JS source map at the end of the js file
			//transform: ["babelify", {presets: ["es2015", "react"]}]  // Browserify transform configuration doesn"t work here. Placed on package.json instead
		}).bundle().pipe(bundledStream); // pipe the Browserify stream into the stream we created earlier this starts our gulp pipeline.
	}).catch(function (err) {
		bundledStream.emit("error", err); // ensure any errors from globby are handled
	});
	
	return bundledStream; // finally, we return the stream, so gulp knows when this task is done.
});

gulp.task("copyHtml", function() {
	return gulp.src([`${src}/index.htm`])
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("less", function () {
	return gulp.src([`${src}/style/*.less`, `${src}/reactComponents/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyAssets", function() {
	return gulp.src([`${src}/*img/*`, `${src}/*data/*`])
		.pipe(gulp.dest(`${dest}`));
});





// Minify

gulp.task("browserifyMin", function () {
	process.env.NODE_ENV = "production";
	const bundledStream = through();
	bundledStream.pipe(vinylSource("app.js"))
		.pipe(vinylBuffer())
		.pipe(uglify())
		.on("error", gutil.log)
		.pipe(gulp.dest(`${dest}`));
	
	globby([
		`${src}/reactComponents/**/*.jsx`,
		`${src}/js/main.jsx`,
		`!${src}/reactComponents/**/*.spec.jsx`
	]).then(function (entries) {
		browserify({
			entries: entries,
			debug: false
		}).bundle().pipe(bundledStream);
	}).catch(function (err) {
		bundledStream.emit("error", err);
	});
	return bundledStream;
});

gulp.task("htmlMin", function() {
	return gulp.src(`${src}/index.htm`)
		.pipe(htmlMin({
			collapseWhitespace: true,
			minifyCSS: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeRedundantAttributes: true
		}))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("lessMin", function () {
	return gulp.src([`${src}/style/*.less`, `${src}/reactComponents/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(cleanCss())
		.pipe(gulp.dest(`${dest}`));
});
