import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { isNode } from "../helpers";
import reducers from "./reducers.js";

function useLocalStorage() {
	if (!isNode()) {
		return localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};
	} else return undefined;
}


let store;

store = createStore(
	reducers,
	useLocalStorage(),
	applyMiddleware(thunk)
);


/* buildDev:start */
const logger = store => next => action => { // eslint-disable-line no-unused-vars
	console.log("dispatching:", action); // eslint-disable-line no-console
	return next(action);
};

store = createStore(
	reducers,
	useLocalStorage(),
	compose(applyMiddleware(logger, thunk), window.devToolsExtension ? window.devToolsExtension() : f => f )
);
/* buildDev:end */

if (!isNode()) {
	store.subscribe(() => {
		localStorage.setItem("reduxState", JSON.stringify(store.getState()));
	});
}

export default store;
