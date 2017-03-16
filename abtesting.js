
// export function abtesting () {
let enabled = true;

function overrideFunction(originalFunction, callback) {
	if (typeof window !== 'undefined') {
		window.enableOverride = enableOverrideFunction;
	}

	return function () {
		if (enabled) {
			callback(arguments);
		}
		return originalFunction.apply(this, arguments);
	};
}

function enableOverrideFunction(enable) {
	enabled = enable;
	console.log('Override function is now: ' + enabled);
	return enabled;
}

function callback(args) {
	var type = args[0],
		children = args[2];

	if (type === 'button' && children === 'Login') {
		// args[2] = 'Magic';
		args[2] = '<b>Magic</b>';
	}
	// console.error(nodes);
	// ++x;
	// console.error(x);
}
// }
console.error('from imported script');
