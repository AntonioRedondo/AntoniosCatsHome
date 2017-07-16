// Basics
const del = require("del");
const gulp = require("gulp");
const newer = require("gulp-newer");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");

// Lint
const esLint = require("gulp-eslint");
const cssLint = require("gulp-stylelint");

// Build
const browserify = require("browserify");
const vinylSource = require("vinyl-source-stream");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const inline = require("gulp-inline");
const postCss = require("gulp-postcss");
const preCss = require("precss");
const autoprefixer = require("autoprefixer");

// Minify and inline
const uglify = require("gulp-uglify");
const htmlMin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");



const SRC = "src";
const DEST = "dist";



gulp.task("watch", ["lint", "build"], () => {
	gulp.watch([`${SRC}/js/**/*.jsx`, `${SRC}/js/**/*.js`, ".eslintrc.json"], ["esLint", "buildJs"]);
	gulp.watch([`${SRC}/index.htm`], ["buildHtml"]);
	gulp.watch([`${SRC}/style/*.scss`, `${SRC}/js/**/*.jsx`, ".stylelintrc.json"], ["styleLint", "buildCss"]);
	gulp.watch([`${SRC}/img/**`], ["copyAssets"]);
});
gulp.task("lint", ["esLint", "styleLint"]);
gulp.task("build", ["buildJs", "buildHtml", "buildCss", "copyAssets"]);
gulp.task("default", ["watch"]);

gulp.task("clean", () => del(DEST));



// ---------- LINT ---------- //

gulp.task("esLint", () => {
	return gulp.src([`${SRC}/js/**/*.jsx`, `${SRC}/js/**/*.js`, "gulpfile.js"])
		.pipe(esLint())
		.pipe(esLint.format())
		.pipe(esLint.failOnError());
});

gulp.task("styleLintJSX", () => {
	return gulp.src([`${SRC}/js/**/*.jsx`])
		.pipe(cssLint({
			reporters: [{ formatter: "string", console: true }]
		}));
});

gulp.task("styleLint", () => {
	return gulp.src([`${SRC}/style/*.scss`])
		.pipe(cssLint({
			// failAfterError: false, // It defaults to true
			reporters: [{ formatter: "string", console: true }]
		}));
});



// ---------- BUILD ---------- //

gulp.task("buildJs", () => {
	return browserify({
		entries: `${SRC}/js/index.jsx`,
		debug: true, // Writes a JS source map at the end of the js file
		//transform: ["babelify", {presets: ["es2015", "react"]}]  // Browserify transform configuration doesn"t work here. Placed on package.json instead
	}).bundle()
		.pipe(vinylSource("bundle.js"))
		.pipe(gulp.dest(DEST));
});

gulp.task("buildHtml", () => {
	return gulp.src([`${SRC}/index.htm`])
		.pipe(gulp.dest(`${DEST}`));
});

gulp.task("buildCss", () => {
	return gulp.src([
		`${SRC}/style/fonts.scss`,
		`${SRC}/style/variables.scss`,
		`${SRC}/style/*.scss`
	])
		.pipe(sourcemaps.init())
		.pipe(concat("style.css"))
		.pipe(postCss([
			preCss({ extension: "scss" }),
			autoprefixer({ browsers: ["safari 9", "ie 11"] }), // https://github.com/ai/browserslist
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST));
});

gulp.task("copyAssets", () => {
	return gulp.src([`${SRC}/*img/*`, `${SRC}/*data/*`])
		.pipe(newer(DEST))
		.pipe(gulp.dest(`${DEST}`));
});



// ---------- MINIFY ---------- //

gulp.task("setProdEnv", () => {
	process.env.NODE_ENV = "production";
	return gulp.src("");
});

gulp.task("min", () => {
	runSequence("setProdEnv", "build", () => {
		return gulp.src([`${DEST}/index.htm`])
			.pipe(inline({
				// base: DEST,
				disabledTypes: ["img"/*, "svg", "js", "css"*/],
				// ignore: [""]
			}))
			.pipe(replace(/(\/\* buildDev:start \*\/)[\s\S]+(\/\* buildDev:end \*\/)/, ""))
			.pipe(replace(/(<!-- buildDev:start -->)[\s\S]+(<!-- buildDev:end -->)/, ""))
			.pipe(htmlMin({
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeRedundantAttributes: true
			}))
			.pipe(gulp.dest(DEST));
	});
});

gulp.task("minSeparated", () => {
	runSequence("setProdEnv", "build", "uglify", "lessMin");
});

gulp.task("uglify", () => {
	return gulp.src(`${DEST}/bundle.js`)
		.pipe(uglify())
		.pipe(gulp.dest(`${DEST}`));
});

gulp.task("lessMin", () => {
	return gulp.src(`${DEST}/style.css`)
		.pipe(cleanCss())
		.pipe(gulp.dest(`${DEST}`));
});
