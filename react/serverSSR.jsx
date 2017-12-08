import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";

const express = require("express");
// const opn = require("opn");
const fs = require("fs");
const path = require("path");

import Store from "./src/js/redux/store";
import Routes from "./src/js/routes.jsx";

const url = "http://localhost:3000";
const indexTemplate = fs.readFileSync(path.join(__dirname, "index.htm"), { encoding: "utf8" });

function App(props) {
	const context = {};
	
	return (
		<Provider store={ Store } >
			<StaticRouter location={ props.url } context={ context }>
				<Routes/>
			</StaticRouter>
		</Provider>
	);
}
App.displayName = "App";
App.propTypes = {
	url: PropTypes.string.isRequired
};

const app = express();


const sheet = new ServerStyleSheet();

// app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
	console.log("express req.url:", req.url);
	
	const reactApp = ReactDOMServer.renderToString(sheet.collectStyles(<App url={ req.url } />));
	// const css = sheet.getStyleTags();
	
	// res.send(indexTemplate.replace("<div class=\"react-app\">", `<div class="react-app">${reactApp}`));
	res.send(indexTemplate.replace(`<div class="react-app">${reactApp}</div>`));
});

app.listen(3000, () => {
	// opn(url);
	console.log("App started on " + url + "\nThe system default browser should open automatically."); // eslint-disable-line no-console
});
