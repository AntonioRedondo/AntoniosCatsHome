import React from "react";
import ReactShallowRenderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import { Cats } from "../../src/js/pages/cats.jsx";


describe("Given the CardList component", () => {
	const shallowRenderer = new ReactShallowRenderer ();
	let tree;
	let mockRequiredPropFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<Cats
				setFilterString={ mockRequiredPropFunction } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
