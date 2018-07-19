import React from "react";
import { Route } from "react-router-dom";

import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";

export default function Routes() {
	return (
		<div>
			<Header/>
			<Route path="/" component={ Home } />
			<Footer/>
		</div>
	);
}
