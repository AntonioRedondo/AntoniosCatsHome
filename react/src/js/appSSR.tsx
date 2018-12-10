import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { injectGlobal } from "styled-components";

import globalCss from "./style/global";
import Store from "./redux/store";

import Routes from "./routes";

injectGlobal`${ globalCss }`; // tslint:disable-line

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
