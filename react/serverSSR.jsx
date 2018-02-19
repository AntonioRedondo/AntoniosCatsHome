import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");
const opn = require("opn");

import AppSSR from "./src/js/appSSR.jsx";

const url = "http://localhost:3000";
const indexTemplate = fs.readFileSync(path.join(__dirname, "indexSSR.htm"), { encoding: "utf8" });
const stateToHydrate = {};

axios.get("http://localhost:3000/data/cats.json")
	.then(results => {
		stateToHydrate.cats = results.data;
		console.log(stateToHydrate);
	})
	.catch(error => {
		console.error(error);
	});

const app = express();

app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
	const sheet = new ServerStyleSheet();
	const reactApp = ReactDOMServer.renderToString(sheet.collectStyles(<AppSSR url={ req.url } />));
	const css = sheet.getStyleTags();
	console.log("heeeeeeeey");
	console.log(css);
	const finalString = indexTemplate.replace(`<!-- #reactApp -->`, reactApp)
		.replace(`<!-- #stateToHydrate -->`, `<script>window.stateToHydrate=${JSON.stringify(stateToHydrate)}</script>`)
		.replace(`<!-- #reactCSS -->`, css);
	
	res.send(finalString);
});

app.listen(3000, () => {
	opn(url);
	console.log("App started on " + url + "\nThe system default browser should open automatically."); // eslint-disable-line no-console
});
