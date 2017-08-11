import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import v from "../style/variables";
import HowToAdopt from "../pages/howToAdopt.jsx";
import Cats from "../pages/cats.jsx";

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
	
	transition: all ${ v.time2 + v.ms };
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		width: 100%;
		border-radius: 0;
	}
	
	&:hover {
		background: orange;
	}
`;

const TransitionGroupStyled = styled(TransitionGroup)`
	position: relative;
`;

/* eslint-disable react/prop-types, react/display-name */
function getPage(pathname) {
	let component;
	
	switch (pathname) {
		case "/": component = <Cats/>; break;
		case "/how-to-adopt": component = <HowToAdopt/>;
	}
	
	return <CSSTransition key={ pathname } timeout={ v.time2 } classNames="navigation-loader">{ component }</CSSTransition>;
}
/* eslint-disable react/prop-types, react/display-name */

function TabNavigator({ location }) {
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
			<TransitionGroupStyled>{ getPage(location.pathname) }</TransitionGroupStyled>
		</div>
	);
}

TabNavigator.displayName = "TabNavigator";

TabNavigator.propTypes = {
	location: PropTypes.object
};

export default TabNavigator;
