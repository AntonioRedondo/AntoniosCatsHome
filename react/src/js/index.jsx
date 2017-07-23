import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { injectGlobal } from "styled-components";

import Store from "./redux/store";
import TabNavigator from "./components/tabNavigator.jsx";
import globalCss from "./style/global.js";


injectGlobal`${ globalCss }`;

ReactDOM.render(
	<Provider store={ Store } >
		<HashRouter >
			<Route path="/" component={ TabNavigator } />
		</HashRouter>
	</Provider>,
	document.getElementsByClassName("react-app")[0]
);
