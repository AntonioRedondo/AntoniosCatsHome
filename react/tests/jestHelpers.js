// https://stackoverflow.com/questions/43604058/requestanimationframe-polyfill-error-in-jest-tests
global.requestAnimationFrame = x => {
	return setTimeout(x, 0);
};
