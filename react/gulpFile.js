"use strict";

const del = require("del");

const gulp = require("gulp");
// const sourceMaps = require("gulp-sourcemaps"); // Not used
const replace = require("gulp-replace");

const jsHint = require("gulp-jshint");
const htmlLint = require("gulp-htmllint");
const lessHint = require("gulp-lesshint");

const concat = require("gulp-concat");
const less = require("gulp-less");

// Modules for Browserify: converts ES6 JS and React JSX to ES5 JS
const browserify = require("browserify");
const vinylSource = require("vinyl-source-stream");
const vinylBuffer = require("vinyl-buffer");

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

gulp.task("browserify", function () {
	return browserify({
		entries: `${src}/js/main.jsx`,
		// debug: true, // "true" writes a JS source map at the end of the js file
		//transform: ["babelify", {presets: ["es2015", "react"]}]  // Browserify transform configuration doesn't work here. Placed on package.json instead
	}).bundle()
		.pipe(vinylSource("app.js"))
		.pipe(gulp.dest(`${dest}`));
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
	return browserify({ entries: `${src}/js/main.jsx` }).bundle()
		.pipe(vinylSource("app.js"))
		.pipe(vinylBuffer())
		.pipe(replace(/(\/\* prodCodeReduxStore:start \*\/)[\s\S]+(\/\* prodCodeReduxStore:end \*\/)/,
			"exports.default = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));"))
		.pipe(uglify())
		.pipe(gulp.dest(`${dest}`));
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
