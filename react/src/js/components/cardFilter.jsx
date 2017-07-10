import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import v from "../variables";

const Filter = styled.input`
	width: 100%;
	max-width: 100%;
	margin: 0 auto 50px;
	padding: 8px 20px 10px;
	display: block;
	
	background: white;
	border-radius: 5px;
	border: 4px solid ${ v.grayB };
	
	color: ${ v.gray3 };
	font-size: 1.8em;
	font-family: "Open Sans", san-serif;
	
	transition: all 0.3s ease-out;
	
	&:hover {
		border-color: orange;
	}
	
	&:focus {
		border-color: ${ v.green1 };
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 10px rgba(0, 0, 0, 0.2) inset;
	}
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		width: calc(~"100% - 100px");
	}
`;

function CardFilter(props) {
	return (
		<Filter type="text" placeholder="Filter by name or description" onChange={ props.onChange } value={ props.value } />
	);
}

CardFilter.displayName = "CardFilter";

CardFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string
};

export default CardFilter;
