import React from "react";
import ReactDOM from "react-dom";
// import { whyDidYouUpdate } from "why-did-you-update";

import App from "./app.jsx";

// #if DEV
// whyDidYouUpdate(React); // https://github.com/maicki/why-did-you-update/issues/48
// #endif

ReactDOM.hydrate(<App/>, document.getElementsByClassName("react-app")[0]);
