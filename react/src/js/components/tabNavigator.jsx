import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import v from "../variables";
import HowToAdopt from "../pages/howToAdopt.jsx";
import CardList from "../pages/cardList.jsx";

const Navigation = styled.nav`
	height: 64px;
	margin-bottom: 50px;
	overflow: hidden;
	
	border-bottom: 4px solid ${ v.purple2 };
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		height: auto;
		border: 0;
	}
	
	& ul {
		margin: 0;
		padding: 0;
	}
	
	& li {
		float: left;
		list-style: none;
		
		@media (max-width: ${ v.mobileBreakpoint }) {
			width: 100%;
		}
	}
`;

const NavLinkStyled = styled(NavLink)`
	width: 240px;
	height: 60px;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	background: ${ v.grayB };
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	
	color: white;
	font-size: 1.5em;
	text-align: center;
	
	transition: all ${ v.animTime2 };
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		width: 100%;
		border-radius: 0;
	}
	
	&:hover {
		background: orange;
	}
`;

const CSSTransitionGroupStyled = styled(CSSTransitionGroup)`
	position: relative;
	display: block;
`;

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
			<Navigation>
				<ul>
					<li>
						<NavLinkStyled to="/" exact activeClassName="tab-navigator--active">
							Cats
						</NavLinkStyled>
					</li>
					<li>
						<NavLinkStyled to="/how-to-adopt" activeClassName="tab-navigator--active" className="tab-navigator">
							How to adopt
						</NavLinkStyled>
					</li>
				</ul>
			</Navigation>
			<CSSTransitionGroupStyled
				transitionName="navigation-loader"
				transitionEnterTimeout={ animationTime }
				transitionLeaveTimeout={ animationTime } >
				<FadeElement pathname={ location.pathname } key={ location.pathname } />
			</CSSTransitionGroupStyled>
		</div>
	);
}

TabNavigator.displayName = "TabNavigator";

TabNavigator.propTypes = {
	location: PropTypes.object
};

export default TabNavigator;
