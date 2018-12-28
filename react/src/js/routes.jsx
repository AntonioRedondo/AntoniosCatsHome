import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import globalCss from "./style/global";

import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";
import Home from "./pages/home.jsx";

export default function Routes() {
	const GlobalStyle = createGlobalStyle`
		${ globalCss }
	`;

	return (
		<>
			<GlobalStyle/>
			<Header/>
			<Route path="/" component={ Home } />
			<Footer/>
		</>
	);
}
