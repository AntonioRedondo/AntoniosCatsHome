import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
const express = require("express");

import App from "./src/js/components/app.jsx";

const fs = require("fs");
const path = require("path");

const url = "http://localhost:3000";
const pathIndexFile = "index.htm";

const app = express();


const sheet = new ServerStyleSheet();
const reactApp = ReactDOMServer.renderToString(sheet.collectStyles(<App/>));
// const css = sheet.getStyleTags();
const indexTemplate = fs.readFileSync(path.join(__dirname, pathIndexFile));
const finalString = indexTemplate.replace("<div class=\"react-app\">", `<div class="react-app">${reactApp}`);

app.get((req, res) => {
	res.send(finalString);
});

app.listen(3000, () => {
	console.log("App started on " + url + "\nThe system default browser should open automatically."); // eslint-disable-line no-console
});
