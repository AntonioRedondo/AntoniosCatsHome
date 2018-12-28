import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import globalCss from "./style/global";

import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";

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
