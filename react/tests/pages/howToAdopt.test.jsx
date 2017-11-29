import React from "react";
import Renderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import HowToAdopt from "../../src/js/pages/howToAdopt.jsx";


describe("Given the HowToAdopt component", () => {
	const shallowRenderer = new Renderer();
	let tree;

	beforeEach(() => {
		shallowRenderer.render(
			<HowToAdopt />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
