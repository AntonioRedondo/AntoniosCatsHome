import React from "react";
import PropTypes from "prop-types";

function CardFilter(props) {
	return (
		<input className="filter" type="text" placeholder="Type to filter by name or description" onChange={ props.onChange } value={ props.value } />
	);
}

CardFilter.displayName = "CardFilter";

CardFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string
};

export default CardFilter;
