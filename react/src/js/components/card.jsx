import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Card(props) {
	return (
		<article onClick={ props.onClick(props.id) }
			className={ cn("card", { "card--selected": props.itemSelected === props.id }) }>
			<div className="card__photo">
				<div className="card__photo-img" style={ { backgroundImage: `url('img/${ props.id }.jpg')` } } alt="Cat Image" ></div>
				<p className="card__photo-name" >{ props.name }</p>
			</div>
			<div className="card__body" >
				<h1 className="card__body-title" >{ props.name }</h1>
				<p className="card__body-text" >{ props.description }</p>
			</div>
		</article>
	);
}

Card.displayName = "Card";

Card.propTypes = {
	description: PropTypes.string,
	id: PropTypes.string.isRequired,
	itemSelected: PropTypes.string,
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Card;
