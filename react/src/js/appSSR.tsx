import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { injectGlobal } from "styled-components";

import globalCss from "./style/global";
import Store from "./redux/store";

import Routes from "./routes";

injectGlobal`${ globalCss }`;

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

AppSSR.propTypes = {
	url: PropTypes.string.isRequired
};

export default AppSSR;
