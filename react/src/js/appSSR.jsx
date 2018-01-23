import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";

import Store from "./redux/store";
import Routes from "./routes.jsx";

function AppSSR(props) {
	const context = {};
	
	return (
		<Provider store={ Store } >
			<StaticRouter location={ props.url } context={ { context } }>
				<Routes/>
			</StaticRouter>
		</Provider>
	);
}

AppSSR.displayName = "AppSSR";
AppSSR.propTypes = {
	url: PropTypes.string.isRequired
};

export default AppSSR;