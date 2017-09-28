const React = require("react");
const reactDomServer = require("react-dom/server");
const express = require("express");

const AntoniosCatsHome = require("./dist/bundleProduction.js");


const url = "http://localhost:3000";
const app = express();

app.get((req, res) => {
	res.send(reactDomServer.renderToString(React.createElement(AntoniosCatsHome)));
});

app.listen(3000, () => {
	console.log("App started on " + url + "\nThe system default browser should open automatically."); // eslint-disable-line no-console
});
