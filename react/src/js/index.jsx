import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";

import Store from "./redux/store";
import TabNavigator from "./components/tabNavigator.jsx";


ReactDOM.render(
	<Provider store={ Store } >
		<HashRouter >
			<Route path="/" component={ TabNavigator } />
		</HashRouter>
	</Provider>,
	document.getElementsByClassName("react-app")[0]
);
