import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import AppSSR from "./src/js/appSSR.jsx";

const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");
const opn = require("opn");

const url = "http://localhost:3000";
const indexTemplate = fs.readFileSync(path.join(__dirname, "indexSSR.htm"), { encoding: "utf8" });
const stateToHydrate = {};
const app = express();

app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
	const sheet = new ServerStyleSheet();
	const html = ReactDOMServer.renderToString(sheet.collectStyles(<AppSSR url={ req.url } />));
	const css = sheet.getStyleTags(); // This line must go after the above one
	const finalString = indexTemplate
		.replace(`<!-- #reactCSS -->`, css)
		.replace(`<!-- #reactHTML -->`, html)
		.replace(`<!-- #stateToHydrate -->`, `<script>window.stateToHydrate=${JSON.stringify(stateToHydrate)}</script>`);
	
	res.send(finalString);
});

app.listen(3000, () => {
	opn(url);
	console.log("SSR server started on " + url + "\nThe system default browser should open automatically."); // eslint-disable-line no-console
});

axios.get(`${url}/data/cats.json`)
	.then(results => {
		stateToHydrate.cats = results.data;
	})
	.catch(error => {
		console.error(error);
	});
