import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IndexLink, Link } from "react-router";


export default (props) => (
	<div>
		<nav className="navigation">
			<ul>
				<li><IndexLink className="navigation__tab" to="/" activeClassName="navigation__tab--active">Cats</IndexLink></li>
				<li><Link className="navigation__tab" to="/how-to-adopt" activeClassName=" navigation__tab--active">How to adopt</Link></li>
			</ul>
		</nav>
		<ReactCSSTransitionGroup
				transitionName="view-loader" 
				transitionEnterTimeout={250} 
				transitionLeaveTimeout={-1}>
			{React.cloneElement(props.children, { key: props.location.pathname })}
		</ReactCSSTransitionGroup>
	</div>
)
