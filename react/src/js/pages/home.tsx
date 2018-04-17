import React from "react";
import styled from "styled-components";

import v from "../style/variables";

import TabNavigator from "../components/tabNavigator.jsx";

const BodyContainer = styled.section`
	min-height: 100%;
	position: relative;
`;

const Subheader = styled.section`
	width: 100%;
	margin: 0;
	padding: 20px 0;
	
	border-top: 80px solid;
	
	background: url("img/header.jpg") 0 38%;
	background-size: cover;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	
	color: white;
`;

const SubheaderContainer = styled.div`
	width: 100%;
	max-width: ${ v.width };
	margin: 0 auto;
`;

const SubheaderTitle = styled.p`
	max-width: 800px;
	margin: 0.2em auto;
	padding-right: 32%;
	
	text-align: center;
	font-size: 3.2em;
	font-weight: bold;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		padding: 0 50% 0 5%;
		
		font-size: 1.8em;
	}
`;

const Main = styled.main`
	width: 100%;
	max-width: ${ v.width };
	margin: 0 auto;
	padding: 50px 50px 160px;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		padding: 50px 0 250px;
		overflow: hidden;
	}
`;

const MainText = styled.p`
	max-width: ${ v.width };
	margin: 0 auto 60px;
	
	font-size: 1em;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		padding: 0 50px;
	}
`;

export default function Home() {
	return (
		<BodyContainer>
		
			<Subheader>
				<SubheaderContainer>
					<SubheaderTitle>
						Adopt a kitty
					</SubheaderTitle>
				</SubheaderContainer>
			</Subheader>
			
			<Main>
				<MainText>
					We aim to never turn away a cat in need of help, caring for them until their owners or loving new homes can be found, no matter how long it takes. We are champions for, and supporters of, vulnerable cats, determined to create lasting changes for animals in our society. Every year, we care for over 8,000 cats.
				</MainText>
				<TabNavigator/>
			</Main>
			
		</BodyContainer>
	);
}
