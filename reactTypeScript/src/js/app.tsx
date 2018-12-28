import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import store from "./redux/store";

import Routes from "./routes";

export default function App() {
	return (
		<Provider store={ store } >
			<HashRouter >
				<Routes/>
			</HashRouter>
		</Provider>
	);
}
