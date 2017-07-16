import React from "react";
import ReactShallowRenderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import CardFilter from "../../src/js/components/cardFilter.jsx";


describe("Given the CardFilter component", () => {
	const shallowRenderer = new ReactShallowRenderer ();
	let tree;

	beforeEach(() => {
		shallowRenderer.render(
			<CardFilter
				onChange={ function() {} } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
