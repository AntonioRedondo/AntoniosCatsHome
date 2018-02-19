import React from "react";
import { Route } from "react-router-dom";

import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";
import Home from "./pages/home.jsx";

export default function Routes() {
	return (
		<div>
			<Header/>
			<Route path="/" component={ Home } />
			<Footer/>
		</div>
	);
}
