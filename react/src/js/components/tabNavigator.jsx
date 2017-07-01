import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";

import HowToAdopt from "../pages/howToAdopt.jsx";
import CardList from "../pages/cardList.jsx";


/* eslint-disable react/prop-types, react/display-name */
const FadeElement = ({ pathname }) => {
	switch (pathname) {
		case "/": return <CardList url="data/cats.json"/>;
		case "/how-to-adopt": return <HowToAdopt/>;
	}
};
/* eslint-enable */

function TabNavigator({ location }) {
	const animationTime = 200;
	
	return (
		<div>
			<nav className="navigation">
				<ul>
					<li>
						<NavLink className="navigation__tab" to="/" exact activeClassName="navigation__tab--active">
							Cats
						</NavLink>
					</li>
					<li>
						<NavLink className="navigation__tab" to="/how-to-adopt" activeClassName=" navigation__tab--active">
							How to adopt
						</NavLink>
					</li>
				</ul>
			</nav>
			<CSSTransitionGroup
				className="navigation-loader"
				transitionName="navigation-loader"
				transitionEnterTimeout={ animationTime }
				transitionLeaveTimeout={ animationTime } >
				<FadeElement pathname={ location.pathname } key={ location.pathname } />
			</CSSTransitionGroup>
		</div>
	);
}

TabNavigator.displayName = "TabNavigator";

TabNavigator.propTypes = {
	location: PropTypes.object
};

export default TabNavigator;
