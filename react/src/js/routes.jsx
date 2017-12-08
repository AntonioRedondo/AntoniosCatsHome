import React from "react";
import { Route } from "react-router-dom";

import TabNavigator from "./components/tabNavigator.jsx";

function Routes() {
	return (
		<div>
			<Route path="/" component={ TabNavigator } />
		</div>
	);
}

Routes.displayName = "Routes";

export default Routes;
