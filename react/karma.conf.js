module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ["browserify", "jasmine"],

		// list of files / patterns to load in the browser
		files: [
			"node_modules/es6-promise/dist/es6-promise.js", // https://github.com/ariya/phantomjs/issues/12401
			"src/reactComponents/**/*.spec.jsx",
			"src/reactComponents/**/*.spec.js"
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			["src/reactComponents/**/*.spec.jsx", "src/reactComponents/**/*.spec.js"]: [ "browserify" ]
		},
		
		browserify: {
			debug: true,
			// Browserify transform configuration doesn't work here. Placed on package.json instead
			//transform: [ "babelify", { presets: ["react", "es2015" ]}]
			//transform: [ "babelify", {"react": true, "es2015": true} ],
			
			// https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md#enzyme--karma--browserify
			configure: function(bundle) {
				bundle.on('prebundle', function() {
					bundle.external('react/addons');
					bundle.external('react/lib/ReactContext');
					bundle.external('react/lib/ExecutionEnvironment');
				});
			}
		},

		// test results reporter to use
		// possible values: "dots", "progress"
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ["spec"],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ["PhantomJS"],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		browserNoActivityTimeout: 10000

	})
};
