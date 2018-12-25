import React from "react";
import styled from "styled-components";

import v from "../style/variables";

const Text = styled.p`
	margin: 0;
	padding: 0;
	
	@media (max-width: ${ v.mobileBreakpoint }) {
		padding: 0 40px;
	}
`;

const Image = styled.img`
	width: 100%;
	margin: 0 auto 40px;
	display: block;
	
	box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
`;

export default function HowToAdopt() {
	return (
		<div>
			<Image src="img/kitten.jpg" />
			<Text>
				The best place to start your search and keep up to date on cats that are available for rehoming is on our online cat gallery. All cats that are ready for rehoming will have their own web profile providing details about their character and the sort of home that they are looking for. Once you have found a cat that you think would be a good match for you, make a note of the cat&#39;s reference number and give us a call on the number provided on their profile.
			</Text>
		</div>
	);
}
