import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import v from "../style/variables";

const CardContainer = styled.article`
	width: 100%;
	height: 250px;
	margin: 0 0 40px;
	overflow: hidden;
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	background: ${ props => props.itemSelected ? "papayawhip" : v.grayE };
	box-shadow: 0 -5px 0 ${ v.purple2 }, 0 0 10px rgba(0, 0, 0, 0.5);
	
	color: ${ v.gray3 };
	
	transition: all ${ v.time1 + v.ms } ease-out;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		height: 150px;
		margin: 0;
			
		box-shadow: 0 5px 0 ${ v.purple2 } inset, 10px 10px 30px rgba(0, 0, 0, 0.2);
	}
	
	&:hover {
		background: ${ props => props.itemSelected ? "papayawhip" : "white" };
		box-shadow: 0 -5px 0 orange, 10px 10px 30px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transform: scale(1.025);
	}
	
	&:active {
		transform: scale(1);
		background: lightyellow;
	}
`;

const PhotoContainer = styled.div`
	width: 250px;
	height: 250px;
	
	position: relative;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		width: 150px;
		min-width: 150px;
		height: 150px;
	}
`;
	
const Img = styled.div`
	width: 100%;
	height: 100%;
	display: block;
	
	position: absolute;
	top: 0;
	left: 0;
	
	background-image: url('img/${ props => props.id }.jpg');
	background-size: cover;
`;
	
const Body = styled.div`
	padding: 40px;
	overflow: hidden;
	
	flex: 1;
	
	font-size: 1em;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		padding-right: 0;
	}
`;

const BodyTitle = styled.h1`
	margin: 0;
	
	font-family: "Rokkitt", serif;
	font-size: 2.5em;
`;

const BodyText = styled.div`
	margin: 0 0 20px;
	
	color: ${ v.gray6 };
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		display: none;
	}
`;

function Card(props) {
	return (
		<CardContainer onClick={ props.onClick(props.id) } itemSelected={ props.itemSelected === props.id }>
			<PhotoContainer>
				<Img alt="Cat Image" id={ props.id }></Img>
			</PhotoContainer>
			<Body>
				<BodyTitle>{ props.name }</BodyTitle>
				<BodyText>{ props.description }</BodyText>
			</Body>
		</CardContainer>
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
