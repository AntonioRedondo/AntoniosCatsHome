// Basics
const del = require("del");
const gulp = require("gulp");
const newer = require("gulp-newer");

// Lint
const esLint = require("gulp-eslint");
const stylelint = require("gulp-stylelint");

// Build
const rollup = require("rollup");
const rollupRe = require("rollup-plugin-re");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupGlobals = require("rollup-plugin-node-globals");
const rollupJson = require("rollup-plugin-json");
const rollupBuiltins = require("rollup-plugin-node-builtins");
const rollupCommonjs = require("rollup-plugin-commonjs");
const rollupBabel = require("rollup-plugin-babel");
// const rollupClosure = require("@ampproject/rollup-plugin-closure-compiler");
const replace = require("gulp-replace");
const inline = require("gulp-inline");

// Production
const htmlMin = require("gulp-htmlmin");



const SRC = "src";
const DEST = "dist";
const isProd = process.env.NODE_ENV === "production";



// ---------- LINT ---------- //

const jsLintTask = () => {
	return gulp.src([`${SRC}/js/**/*.jsx`, `${SRC}/js/**/*.js`, "gulpfile.js"])
		.pipe(esLint())
		.pipe(esLint.format())
		.pipe(esLint.failOnError());
};

const stylelintTask = () => {
	return gulp.src([`${SRC}/js/**/*.jsx`])
		.pipe(stylelint({ reporters: [{ formatter: "string", console: true }] }));
};



// ---------- BUILD ---------- //

const buildJsTask = async (done, ssr = false) => {
	const bundle = await rollup.rollup({
		input: ssr ? "serverSSR.jsx" : `${SRC}/js/index.jsx`,
		plugins: [
			// rollupReplace({
			// 	"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
			// 	"/(\/\* buildDev:start \*\/)[\s\S]+(\/\* buildDev:end \*\/)/" : "" // eslint-disable-line
			// }),
			rollupRe({
				// exclude: "node_modules/**",
				defines: {
					DEV: !isProd,
					PROD: isProd,
				},
				replaces: {
					"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
				}
			}),
			rollupBabel(),
			rollupNodeResolve({
				jsnext: true,
				preferBuiltins: true,
				browser: true
			}),
			rollupCommonjs({
				namedExports: {
					"node_modules/react/index.js": [ "createContext", "createElement", "cloneElement", "Children", "Component", "PureComponent", "Fragment" ],
					"node_modules/react-is/index.js": ["isElement", "isValidElementType", "ForwardRef"],
				}
			}),
			rollupJson(),
			rollupGlobals(),
			rollupBuiltins(),
			// isProd && rollupClosure(), // Error: Unknown object type "asyncfunction"
		]
	});

	return bundle.write({
		format: "iife",
		file: ssr ? `${DEST}/bundleSSR.js` : `${DEST}/bundle.js`,
		sourcemap: !isProd
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
			// ignore: [""]
			disabledTypes: ["img"/*, "svg", "js", "css"*/],
		}))
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

exports.lint = gulp.parallel(jsLintTask, stylelintTask);
exports.buildWatch = gulp.series(buildTask, function watchTask() {
	gulp.watch([`${SRC}/js/**/*.ts+(|x)`], gulp.parallel(jsLintTask, stylelintTask, buildJsTask));
	gulp.watch([`${SRC}/index.htm`], gulp.parallel(buildHtmlTask));
	gulp.watch([`${SRC}/img/**`], gulp.parallel(copyAssetsTask));
});
exports.buildProd = gulp.series(buildTask, prodTask);
exports.buildSsr = gulp.series(buildTask, buildJsTask.bind(this, null, true), buildSsrTask);
exports.clean = () => del(DEST);
exports.default = exports.watch;
