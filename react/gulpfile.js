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
const rollup = require("rollup");
const rollupReplace = require("rollup-plugin-replace");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupGlobals = require("rollup-plugin-node-globals");
const rollupBuiltins = require("rollup-plugin-node-builtins");
const rollupCommonjs = require("rollup-plugin-commonjs");
const rollupUglify = require("rollup-plugin-uglify");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const inline = require("gulp-inline");
const postCss = require("gulp-postcss");
const preCss = require("precss");
const autoprefixer = require("autoprefixer");

// Production
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
gulp.task("default", ["build"]);

gulp.task("clean", () => del(DEST));



// ---------- LINT ---------- //

gulp.task("esLint", () => {
	return gulp.src([`${SRC}/js/**/*.jsx`, `${SRC}/js/**/*.js`, "gulpfile.js"])
		.pipe(esLint())
		.pipe(esLint.format())
		.pipe(esLint.failOnError());
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
	return rollup.rollup({
		input: `${SRC}/js/index.jsx`,
		plugins: [
			rollupReplace({
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV === "production" ? "production" : "development")
			}),
			rollupBabel({
				babelrc: false,
				exclude: "node_modules/**",
				presets: [ [ "env", { modules: false } ], "react" ],
				plugins: [ "external-helpers", "transform-class-properties" ]
			}),
			rollupNodeResolve({ jsnext: true }),
			// rollupGlobals(),
			// rollupBuiltins(),
			rollupCommonjs({
				include: "node_modules/**",
				namedExports: {
					"node_modules/react/index.js": [ "cloneElement", "createElement", "Children", "Component" ]
				}
			}),
			// rollupUglify()
		]
	}).then(bundle => {
		return bundle.write({
			format: "iife",
			file: `${DEST}/bundle.js`,
			sourcemap: true
		});
	});
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



// ---------- PRODUCTION ---------- //

gulp.task("min", () => {
	runSequence("build", () => {
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
				minifyJS: false,
				removeAttributeQuotes: true,
				removeComments: true,
				removeRedundantAttributes: true
			}))
			.pipe(gulp.dest(DEST));
	});
});

gulp.task("minSeparated", () => {
	runSequence("setProdEnv", "build", "uglify", "cssMin");
});

gulp.task("uglify", () => {
	return gulp.src(`${DEST}/bundle.js`)
		.pipe(uglify())
		.pipe(gulp.dest(`${DEST}`));
});

gulp.task("cssMin", () => {
	return gulp.src(`${DEST}/style.css`)
		.pipe(cleanCss())
		.pipe(gulp.dest(`${DEST}`));
});

gulp.task("buildJsServer", () => {
	return rollup.rollup({
		input: "serverProduction.jsx",
		plugins: [
			rollupReplace({
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV === "production" ? "production" : "development")
			}),
			rollupBabel({
				babelrc: false,
				exclude: "node_modules/**",
				presets: [ [ "env", { modules: false } ], "react" ],
				plugins: [ "external-helpers", "transform-class-properties" ]
			}),
			rollupNodeResolve({ jsnext: true, preferBuiltins: true }),
			rollupGlobals(),
			rollupBuiltins(),
			rollupCommonjs({
				include: "node_modules/**",
				namedExports: {
					"node_modules/react/index.js": [ "cloneElement", "createElement", "Children", "Component" ]
				}
			})
		]
	}).then(bundle => {
		return bundle.write({
			format: "iife",
			file: `${DEST}/bundleServer.js`,
			sourcemap: true
		});
	});
});
