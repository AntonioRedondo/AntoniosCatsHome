import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxStore from "../reactComponents/cardList/redux/store";
import { Router, Route, IndexRoute, useRouterHistory } from "react-router";
import { createHashHistory } from "history";
import CardList from "../reactComponents/cardList/container.jsx";
import HowToAdopt from "../reactComponents/howToAdopt/container.jsx";
import TabNavigator from "../reactComponents/tabNavigator/container.jsx";




ReactDOM.render(
	<Provider store={ReduxStore}>
		<Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
			<Route path="/" component={TabNavigator}>
				<IndexRoute component={CardList} />
				<Route path="/" key="cats" component={CardList} />
				<Route path="/how-to-adopt" key="how-to-adopt" component={HowToAdopt} />
			</Route>
		</Router>
	</Provider>,
	document.getElementsByClassName("react-app")[0]
);
