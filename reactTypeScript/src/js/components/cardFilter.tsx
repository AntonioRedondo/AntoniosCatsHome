import React from "react";
import styled from "styled-components";

import v from "../style/variables";

interface ICardFilterProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

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
	font-family: "Open Sans", sans-serif;
	
	transition: all 0.3s ease-out;
	
	&:hover {
		border-color: orange;
	}
	
	&:focus {
		border-color: ${ v.green1 };
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 10px  ${ v.shadow2 } inset;
	}
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		width: calc(100% - 100px);
	}
`;

function CardFilter(props: ICardFilterProps) {
	return <Filter type="text" placeholder="Filter by name or description" onChange={ props.onChange } value={ props.value } />;
}

export default CardFilter;
