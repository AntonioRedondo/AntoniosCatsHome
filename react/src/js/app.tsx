import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import Store from "./redux/store";

import Routes from "./routes";

export default function App() {
	return (
		<Provider store={ Store } >
			<HashRouter >
				<Routes/>
			</HashRouter>
		</Provider>
	);
}
