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





// Lint

gulp.task("jsHint", () => {
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

gulp.task("htmlLint", () => {
	return gulp.src([
			`${src}/*.htm`,
			`${src}/angularTpl/*.tpl.htm`,
			`${src}/angularDirectives/**/*.tpl.htm`
		])
		.pipe(htmlLint()); // https://github.com/htmllint/htmllint/wiki/Options
});

gulp.task("lessHint", () => {
	return gulp.src([
			`${src}/style/*.less`,
			`${src}/angularTpl/*.less`,
			`${src}/angularDirectives/**/*.less`
		])
		.pipe(lessHint())
		.pipe(lessHint.reporter());
});





const jsSrc = [
		"node_modules/angular/angular.js",
		"node_modules/angular-animate/angular-animate.js",
		"node_modules/angular-ui-router/release/angular-ui-router.js",
		`${src}/js/main.js`,
		`${src}/js/*.js`,
		`${src}/angularDirectives/**/*.js`,
		`!${src}/js/*.spec.js`,
		`!${src}/angularDirectives/**/*.spec.js`
	];
		
const htmlSrc = [
		`${src}/*angularDirectives/**/*.tpl.htm`,
		`${src}/*angularTpl/*.tpl.htm`,
		`${src}/index.htm`
	];
		
const cssSrc = [
		`${src}/style/*.less`,
		`${src}/angularTpl/*.less`,
		`${src}/angularDirectives/**/*.less`
	];





// Build
		
gulp.task("copyJS", () => {
	return gulp.src(jsSrc)
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyHtml", () => {
	return gulp.src(htmlSrc)
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("less", () => {
	return gulp.src(cssSrc)
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("copyAssets", () => {
	return gulp.src([`${src}/*img/*`, `${src}/*data/*`])
		.pipe(gulp.dest(`${dest}`));
});





// Minify

gulp.task("uglify", () => {
	return gulp.src(jsSrc)
		.pipe(uglify())
		.pipe(concat("app.js"))
		.pipe(gulp.dest(`${dest}`));
});

gulp.task("htmlMin", () => {
	return gulp.src(htmlSrc)
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
	return gulp.src(cssSrc)
		.pipe(less())
		.pipe(concat("style.css"))
		.pipe(cleanCss())
		.pipe(gulp.dest(`${dest}`));
});
