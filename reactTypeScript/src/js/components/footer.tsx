import React from "react";
import styled from "styled-components";

import v from "../style/variables";

const FooterStyled = styled.footer`
	width: 100%;
	padding: 30px;
	
	bottom: 0;
	
	background: ${ v.green1 };
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
	
	color: white;
	text-align: center;
	font-size: 0.9em;
`;

export default function Footer() {
	return (
		<FooterStyled className="footer">
			Please check the <a href="../README.htm">README</a> file for further information.
		</FooterStyled>
	);
}
