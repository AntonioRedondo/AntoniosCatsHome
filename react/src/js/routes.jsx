import React from "react";
import { Route } from "react-router-dom";

import TabNavigator from "./components/tabNavigator.jsx";

export default function Routes() {
	return (
		<div>
			<Route path="/" component={ TabNavigator } />
		</div>
	);
}
