import React from "react";
import Renderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import TabNavigator from "../../src/js/components/tabNavigator";


describe("Given the TabNavigator component", () => {
	const shallowRenderer = new Renderer();
	let tree;
	const mockProps = {
		location: { pathname: "/how-to-adopt" }
	};
	
	beforeEach(() => {
		shallowRenderer.render(
			<TabNavigator { ...mockProps } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
});
