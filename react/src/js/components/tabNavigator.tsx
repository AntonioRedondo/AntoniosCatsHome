import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withRouter, NavLink, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import v from "../style/variables";

import HowToAdopt from "../pages/howToAdopt";
import Cats from "../pages/cats";

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

// This prevents TransitionGroup from working correctly
// const TransitionGroupStyled = styled(TransitionGroup)`
// 	position: relative;
// `;

export class TabNavigator extends Component<RouteComponentProps> {
	getPage = (pathname: string) => {
		let component: any;
		
		switch (pathname) {
			case "/": component = <Cats/>; break;
			case "/how-to-adopt": component = <HowToAdopt/>; break;
			default: component = "404 Page not found!";
		}
		
		return <CSSTransition key={ pathname } timeout={ v.time2 } classNames="navigation-loader">{ component }</CSSTransition>;
	}
	
	render() {
		return (
			<>
				<Navigation>
					<ul>
						<li>
							<NavLinkStyled to="/" exact activeClassName="tab-navigator--active">
								Cats
							</NavLinkStyled>
						</li>
						<li>
							<NavLinkStyled to="/how-to-adopt" activeClassName="tab-navigator--active">
								How to adopt
							</NavLinkStyled>
						</li>
					</ul>
				</Navigation>
				<TransitionGroup className="tab-navigator">{ this.getPage(this.props.location.pathname) }</TransitionGroup>
			</>
		);
	}
}

export default withRouter(TabNavigator);
