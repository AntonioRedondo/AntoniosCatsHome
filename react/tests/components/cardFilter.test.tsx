import * as React from "react";
import * as Renderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import CardFilter from "../../src/js/components/cardFilter";


describe("Given the CardFilter component", () => {
	const shallowRenderer = new Renderer();
	let tree;
	let mockFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<CardFilter onChange={ mockFunction } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
