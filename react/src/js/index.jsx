import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { whyDidYouUpdate } from "why-did-you-update";

import globalCss from "./style/global";
import App from "./app.jsx";

// #if DEV
whyDidYouUpdate(React);
// #endif

injectGlobal`${ globalCss }`;

ReactDOM.hydrate(<App/>, document.getElementsByClassName("react-app")[0]);
