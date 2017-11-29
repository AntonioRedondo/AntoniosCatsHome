import React from "react";
import Renderer from "react-test-renderer/shallow";

import mockCatList from "../../src/data/cats.json";
import { CardList } from "../../src/js/components/cardList.jsx";


describe("Given the CardList component", () => {
	const shallowRenderer = new Renderer();
	let tree;
	const mockRequiredPropFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<CardList
				items={ mockCatList }
				requestCatList={ mockRequiredPropFunction }
				setSelected={ mockRequiredPropFunction } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
