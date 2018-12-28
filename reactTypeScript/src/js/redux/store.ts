import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { isNode } from "../helpers";
import reducers from "./reducers.js";

function setInitialState() {
	if (!isNode()) {
		let initialState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};
		if ((window as any).stateToHydrate)
			initialState = Object.assign(initialState, (window as any).stateToHydrate);
		return initialState;
	}
}

let store = createStore(
	reducers,
	setInitialState(),
	applyMiddleware(thunk)
);

if (!isNode()) {
	// #if DEV
	const logger = () => next => action => { // tslint:disable-line no-unused-vars
		console.log("dispatching:", action); // tslint:disable-line no-console
		return next(action);
	};

	store = createStore(
		reducers,
		setInitialState(),
		compose(applyMiddleware(logger, thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f )
	);
	// #endif
	
	store.subscribe(() => {
		localStorage.setItem("reduxState", JSON.stringify(store.getState()));
	});
}

export default store;
