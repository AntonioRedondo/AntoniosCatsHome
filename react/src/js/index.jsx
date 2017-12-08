import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { injectGlobal } from "styled-components";
import { whyDidYouUpdate } from "why-did-you-update";

import Store from "./redux/store";
import globalCss from "./style/global";
import Routes from "./routes.jsx";

/* buildDev:start */
whyDidYouUpdate(React);
/* buildDev:end */

injectGlobal`${ globalCss }`;

ReactDOM.render(
	<Provider store={ Store } >
		<HashRouter >
			<Routes/>
		</HashRouter>
	</Provider>
	, document.getElementsByClassName("react-app")[0]);
