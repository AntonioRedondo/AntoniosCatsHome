import React from "react";
import styled from "styled-components";

import v from "../style/variables";

const HeaderBlock = styled.header`
	width: 100%;
	height: 80px;
	z-index: 1;
	
	position: fixed;
	top: 0;
	left: 0;
	
	background: ${ v.purple2 };
	box-shadow: 0 0 10px ${ v.shadow1 };
	
	text-align: center;
	font-size: 2em;
`;

const HeaderContainer = styled.div`
	max-width: ${ v.width };
	height: 80px;
	margin: 0 auto;
	padding: 0 50px;
	
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderH1 = styled.h1`
	max-width: ${ v.width };
	margin: 0;
	
	flex: 1;
	
	color: white;
	font-family: "Rokkitt", serif;
	font-size: 1.2em;
	line-height: 0.8em;
	text-shadow: 3px 3px 0 $purple1;
	text-align: left;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		margin: 10px auto;
		padding: 0;
		
		font-size: 0.9em;
		text-align: center;
	}
`;

export default function Header() {
	return (
		<HeaderBlock>
			<HeaderContainer>
				<HeaderH1>Antonio&apos;s Cats Home</HeaderH1>
			</HeaderContainer>
		</HeaderBlock>
	);
}
