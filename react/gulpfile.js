// Basics
const del = require("del");
const gulp = require("gulp");
const newer = require("gulp-newer");

// Lint
const tsLint = require("gulp-tslint");
const stylelint = require("gulp-stylelint");

// Build
const rollup = require("rollup");
const rollupRe = require("rollup-plugin-re");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupGlobals = require("rollup-plugin-node-globals");
const rollupJson = require("rollup-plugin-json");
const rollupBuiltins = require("rollup-plugin-node-builtins");
const rollupCommonjs = require("rollup-plugin-commonjs");
const rollupTypeScript = require("rollup-plugin-typescript2");
// const rollupClosure = require("rollup-plugin-closure-compiler-js"); // https://github.com/google/closure-compiler-js/issues/23
const replace = require("gulp-replace");
const inline = require("gulp-inline");

// Production
const htmlMin = require("gulp-htmlmin");



const SRC = "src";
const DEST = "dist";
const isProduction = process.env.NODE_ENV === "production";



// ---------- LINT ---------- //

const tsLintTask = () => {
	return gulp.src([`${SRC}/js/**/*.tsx`, `${SRC}/js/**/*.ts`])
		.pipe(tsLint({
			formatter: "stylish"
		}))
		.pipe(tsLint.report({
			emitError: false // defaults to true
		}));
};

const stylelintTask = () => {
	return gulp.src([`${SRC}/js/**/*.tsx`])
		.pipe(stylelint({ reporters: [{ formatter: "string", console: true }] }));
};



// ---------- BUILD ---------- //

const buildJsTask = async () => {
	const bundle = await rollup.rollup({
		input: `${SRC}/js/index.tsx`,
		plugins: [
		// rollupReplace({
		// 	"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		// 	"/(\/\* buildDev:start \*\/)[\s\S]+(\/\* buildDev:end \*\/)/" : "" // tsLint-disable-line
		// }),
			rollupRe({
				// exclude: "node_modules/**",
				defines: {
					DEV: !isProduction,
					PROD: isProduction,
				},
				replaces: {
					"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
				}
			}),
			rollupNodeResolve({
				jsnext: true,
				preferBuiltins: true,
				browser: true }),
			rollupCommonjs({
				include: "node_modules/**",
				namedExports: {
					"node_modules/react/index.js": [ "createElement", "createContext", "cloneElement", "Children", "Component", "PureComponent", "Fragment" ],
					"node_modules/react-is/index.js": ["isValidElementType"],
					"node_modules/react-redux/node_modules/react-is/index.js": ["isValidElementType"],
					"node_modules/styled-components/node_modules/react-is/index.js": ["isElement", "isValidElementType", "ForwardRef"]
				}
			}),
			rollupTypeScript({
				rollupCommonJSResolveHack: true,
				include: [ "**/*.ts+(|x)" ]
			}),
			rollupJson(),
			rollupGlobals(),
			rollupBuiltins(),
			// isProduction && rollupClosure()
		]
	});
	
	return bundle.write({
		format: "iife",
		file: `${DEST}/bundle.js`,
		sourcemap: !isProduction
	});
};

const buildHtmlTask = () => {
	return gulp.src([`${SRC}/index.htm`, `${SRC}/indexSSR.htm`])
		.pipe(gulp.dest(`${DEST}`));
};

const copyAssetsTask = () => {
	return gulp.src([`${SRC}/*img/*`, `${SRC}/*data/*`])
		.pipe(newer(DEST))
		.pipe(gulp.dest(`${DEST}`));
};



// ---------- PRODUCTION ---------- //

const prodTask = () => {
	return gulp.src([`${DEST}/index.htm`])
		.pipe(inline({
			// base: DEST,
			disabledTypes: ["img"/*, "svg", "js", "css"*/],
			// ignore: [""]
		}))
		// .pipe(replace(/\/\* buildDev:start \*\/[\s\S]*\/\* buildDev:end \*\//, ""))
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
};



// ---------- SSR ---------- //

const buildSsrJsTask = async () => {
	const bundle = await rollup.rollup({
		input: "serverSSR.jsx",
		plugins: [
			rollupRe({
				defines: {
					DEV: !isProduction,
					PROD: isProduction,
				},
				replaces: {
					"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
				}
			}),
			rollupNodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
			rollupCommonjs({
				include: "node_modules/**",
				namedExports: {
					"node_modules/react/index.js": [ "cloneElement", "createElement", "Children", "Component" ]
				}
			}),
			rollupTypeScript({
				rollupCommonJSResolveHack: true,
				include: [ "**/*.ts+(|x)" ]
			}),
			rollupJson(),
			rollupGlobals(),
			rollupBuiltins()
		]
	});
	
	return bundle.write({
		format: "iife",
		file: `${DEST}/bundleSSR.js`,
		sourcemap: !isProduction
	});
};

const buildSsrTask = () => {
	return gulp.src([`${DEST}/indexSSR.htm`])
		.pipe(inline({
			disabledTypes: ["img"],
		}))
		.pipe(htmlMin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeAttributeQuotes: true,
			removeComments: false,
			removeRedundantAttributes: true
		}))
		.pipe(gulp.dest(DEST));
};



const buildTask = gulp.parallel(buildJsTask, buildHtmlTask, copyAssetsTask);

exports.lint = gulp.series(tsLintTask, stylelintTask);
exports.watch = gulp.series(buildTask, function watchTask() {
	gulp.watch([`${SRC}/js/**/*.ts+(|x)`], gulp.parallel(tsLintTask, stylelintTask, buildJsTask));
	gulp.watch([`${SRC}/index.htm`], gulp.parallel(buildHtmlTask));
	gulp.watch([`${SRC}/img/**`], gulp.parallel(copyAssetsTask));
});
exports.prod = gulp.series(buildTask, prodTask);
exports.buildSsr = gulp.series(buildSsrJsTask, buildSsrTask);
exports.clean = () => del(DEST);
exports.default = exports.watch;
