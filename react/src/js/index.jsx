import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { whyDidYouUpdate } from "why-did-you-update";

import globalCss from "./style/global.js";
import App from "./components/app.jsx";

/* buildDev:start */
whyDidYouUpdate(React);
/* buildDev:end */

injectGlobal`${ globalCss }`;

ReactDOM.render(<App/>, document.getElementsByClassName("react-app")[0]);
