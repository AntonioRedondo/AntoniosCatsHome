import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { isNode } from "../helpers";
import reducers from "./reducers.js";

function setInitialState() {
	if (!isNode()) {
		let initialState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};
		if (window.stateToHydrate) {
			initialState = Object.assign(initialState, window.stateToHydrate);
		}
		return initialState;
	} else return;
}


let store;

store = createStore(
	reducers,
	setInitialState(),
	applyMiddleware(thunk)
);


if (!isNode()) {
	/* buildDev:start */
	const logger = store => next => action => { // eslint-disable-line no-unused-vars
		console.log("dispatching:", action); // eslint-disable-line no-console
		return next(action);
	};

	store = createStore(
		reducers,
		setInitialState(),
		compose(applyMiddleware(logger, thunk), window.devToolsExtension ? window.devToolsExtension() : f => f )
	);
	/* buildDev:end */
	
	store.subscribe(() => {
		localStorage.setItem("reduxState", JSON.stringify(store.getState()));
	});
}

export default store;
