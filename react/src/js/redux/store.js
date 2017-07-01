import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers.js";


let store;

store = createStore(
	reducers,
	{},
	applyMiddleware(thunk));

	
/* buildDev:start */
const logger = store => next => action => { // eslint-disable-line no-unused-vars
	console.log("dispatching:", action); // eslint-disable-line no-console
	return next(action);
};

store = createStore(
	reducers,
	compose(applyMiddleware(logger, thunk), window.devToolsExtension ? window.devToolsExtension() : f => f ));
/* buildDev:end */

store.subscribe(() => {
	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
