import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import globalCss from "./style/global";
import Store from "./redux/store";

import Routes from "./routes";

// tslint:disable-next-line no-unused-expression
createGlobalStyle`
	${ globalCss }
`;

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

export default AppSSR;
