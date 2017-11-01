import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";

import Store from "../redux/store";
import TabNavigator from "./tabNavigator.jsx";

function App() {
	return (
		<Provider store={ Store } >
			<HashRouter >
				<Route path="/" component={ TabNavigator } />
			</HashRouter>
		</Provider>
	);
}

App.displayName = "App";

export default App;
