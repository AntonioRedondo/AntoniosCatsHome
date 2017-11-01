import React from "react";
import styled from "styled-components";

import v from "../style/variables";

const HeaderBlock = styled.header`
	width: 100%;
	height: 80px;
	z-index: 1;
	
	position: fixed;
	top: 0;
	
	background: $purple2;
	box-shadow: 0 0 10px ${ v.shadow1 };
	
	text-align: center;
	font-size: 2em;
`;

const HeaderContainer = styled.div`
	max-width: $width;
	height: 80px;
	margin: 0 auto;
	padding: 0 50px;
	
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderTitle = styled.h1`
	max-width: $width;
	margin: 0;
	
	flex: 1;
	
	color: $grayE;
	font-family: "Rokkitt", serif;
	font-size: 1.2em;
	line-height: 0.8em;
	text-shadow: 3px 3px 0 $purple1;
	text-align: left;
	
	&--name {
		color: white;
	}
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		margin: 10px auto;
		padding: 0;
		
		font-size: 0.9em;
		text-align: center;
	}
`;

function Header() {
	return (
		<HeaderBlock>
			<HeaderContainer>
				<HeaderTitle>Antonio&apos;s Cats Home</HeaderTitle>
			</HeaderContainer>
		</HeaderBlock>
	);
}

Header.displayName = "Header";

export default Header;
