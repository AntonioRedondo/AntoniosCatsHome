import React from "react";
import Renderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import { Cats } from "../../src/js/pages/cats";


describe("Given the CardList component", () => {
	const shallowRenderer = new Renderer();
	const mockRequiredPropFunction = () => {};
	let tree;

	beforeEach(() => {
		shallowRenderer.render(
			<Cats setFilterString={ mockRequiredPropFunction } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
