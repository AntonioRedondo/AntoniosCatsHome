"use strict";

const del = require("del");

const gulp = require("gulp");

const jsHint = require("gulp-jshint");
const htmlLint = require("gulp-htmllint");
const lessHint = require('gulp-lesshint');

const concat = require("gulp-concat");
const less = require("gulp-less");

const uglify = require("gulp-uglify");
const htmlMin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");


const src = "src";
const dest = "dist";





gulp.task("default", ["watch"]);
gulp.task("lint", ["jsHint", "htmlLint", "lessHint"]);
gulp.task("build", ["copyJS", "copyTpl", "copyHtml", "less", "copyAssets"]);
gulp.task("min", ["uglify", "htmlMin", "lessMin", "copyAssets"]);





gulp.task("clean", () => {
	return del([`${dest}`]);
});





gulp.task("watch", ["lint", "build"], () => {
	gulp.watch([`gulpFile.js`, `${src}/**`], ["lint", "build"]);
});





// Lint

gulp.task("jsHint", function() {
	return gulp.src([`${src}/js/*.js`, `${src}/angularDirectives/**/*.js`])
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
			
			globals: { "angular" : true },
			browser: true,
			jasmine: true,
			node: true
		}))
		.pipe(jsHint.reporter("jshint-stylish"))
		.pipe(jsHint.reporter("fail"));
});

gulp.task("htmlLint", function() {
	return gulp.src([`${src}/*.htm`, `${src}/angularDirectives/**/*.tpl.htm`])
		.pipe(htmlLint()); // https://github.com/htmllint/htmllint/wiki/Options
});

gulp.task("lessHint", function() {
	return gulp.src([`${src}/style/*.less`, `${src}/angularDirectives/**/*.less`])
		.pipe(lessHint())
		.pipe(lessHint.reporter());
});





// Build

gulp.task("copyJS", function() {
	return gulp.src([
			"node_modules/angular/angular.js",
			"node_modules/angular-animate/angular-animate.js",
			"node_modules/angular-ui-router/release/angular-ui-router.js",
			`${src}/js/main.js`,
			`${src}/js/*.js`,
			`${src}/angularDirectives/**/*.js`,
			`!${src}/js/*.spec.js`,
			`!${src}/angularDirectives/**/*.spec.js`])
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyTpl", function() {
	return gulp.src([
			`${src}/*angularDirectives/**/*.tpl.htm`,
			`${src}/*angularTpl/*.tpl.htm`,
		])
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyHtml", function() {
	return gulp.src([`${src}/index.htm`])
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("less", function () {
	return gulp.src([
			`${src}/style/*.less`,
			`${src}/angularTpl/*.less`,
			`${src}/angularDirectives/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyAssets", function() {
	return gulp.src([`${src}/*img/*`, `${src}/*data/*`])
		.pipe(gulp.dest(`${dest}`));
});





// Minify

gulp.task('uglify', function() {
	return gulp.src(["node_modules/angular/angular.min.js", `${src}/js/main.js`, `${src}/js/*.js`, `!${src}/js/*.spec.js`, `${src}/angularDirectives/**/*.js`])
		.pipe(uglify())
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("htmlMin", function() {
	return gulp.src([`${src}/index.htm`, `${src}/*angularDirectives/**/*.tpl.htm`])
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
	return gulp.src([`${src}/style/*.less`, `${src}/angularDirectives/**/*.less`])
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(cleanCss())
		.pipe(gulp.dest(`${dest}`));
});
