"use strict";

const del = require("del");
const gulp = require("gulp");

// Lint
const jsHint = require("gulp-jshint");
const htmlLint = require("gulp-htmllint");
const lessHint = require('gulp-lesshint');

// Build
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const less = require("gulp-less");

// Minify
const uglify = require("gulp-uglify");
const htmlMin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");



const src = "src";
const dest = "dist";





gulp.task("default", ["watch"]);
gulp.task("lint", ["jsHint", "htmlLint", "lessHint"]);
gulp.task("build", ["copyJS", "copyHtml", "less", "copyAssets"]);
gulp.task("min", ["uglify", "htmlMin", "lessMin", "copyAssets"]);





gulp.task("clean", () => {
	return del([`${dest}`]);
});





gulp.task("watch", ["lint", "build"], () => {
	gulp.watch([`gulpFile.js`, `${src}/**`], ["lint", "build"]);
});





// ---------- LINT ---------- //

gulp.task("jsHint", () => {
	return gulp.src(`${src}/js/*.js`)
		.pipe(jsHint({
			lookup: false,

			// http://jshint.com/docs/options
			// https://github.com/jshint/jshint/blob/master/examples/.jshintrc
			camelcase: true,
			devel: true,
			esversion: 6,
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

gulp.task("htmlLint", () => {
	return gulp.src([`${src}/*.htm`, `${src}/tpl/*.tpl.htm`])
		.pipe(htmlLint()); // https://github.com/htmllint/htmllint/wiki/Options
});

gulp.task("lessHint", () => {
	return gulp.src([`${src}/style/*.less`])
		.pipe(lessHint())
		.pipe(lessHint.reporter());
});





// ---------- BUILD ---------- //

gulp.task("copyJS", () => {
	return gulp.src([`${src}/components/**/*.js`, `!${src}/components/**/*.spec.js`, `${src}/js/*.js`, `!${src}/js/*.spec.js`])
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyHtml", () => {
	return gulp.src([`${src}/index.htm`, `${src}/*components/**/*.tpl.htm`])
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyAssets", () => {
	return gulp.src([`${src}/*img/*`, `${src}/*data/*`])
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("less", () => {
	return gulp.src([`${src}/style/*.less`, `${src}/components/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(gulp.dest(`${dest}`));
});





// ---------- MINIFY ---------- //

gulp.task("uglify", () => {
	return gulp.src([`${src}/components/**/*.js`, `!${src}/components/**/*.spec.js`, `${src}/js/*.js`, `!${src}/js/*.spec.js`])
		.pipe(uglify())
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("htmlMin", () => {
	return gulp.src([`${src}/index.htm`, `${src}/*components/**/*.tpl.htm`])
		.pipe(replace(/(<!-- buildDev:start -->)[\s\S]+(<!-- buildDev:end -->)/, ""))
		.pipe(htmlMin({
			collapseWhitespace: true,
			minifyCSS: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeRedundantAttributes: true
		}))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("lessMin", () => {
	return gulp.src([`${src}/style/*.less`, `${src}/components/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(cleanCss())
		.pipe(gulp.dest(`${dest}`));
});
