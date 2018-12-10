import React from "react";
import ReactDOM from "react-dom";
import { whyDidYouUpdate } from "why-did-you-update";

import App from "./app";

// #if DEV
whyDidYouUpdate(React);
// #endif

// #if DEV
ReactDOM.render(<App/>, document.getElementsByClassName("react-app")[0]);
// #endif

// #if PROD
ReactDOM.hydrate(<App/>, document.getElementsByClassName("react-app")[0]);
// #endif
