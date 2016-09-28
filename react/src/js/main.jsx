import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxStore from "../reactComponents/CardList/redux/store";
import CardList from "../reactComponents/CardList/container.jsx";


ReactDOM.render(
	<Provider store={ReduxStore}>
		<CardList />
	</Provider>,
	document.getElementsByClassName("card-list")[0]
);

// ReactDOM.render(
//	<CardList url="data/cards.json"/>,
//	document.getElementsByClassName("card-list")[0]
// );
