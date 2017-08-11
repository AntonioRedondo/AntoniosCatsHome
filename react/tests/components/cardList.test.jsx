import React from "react";
import ReactShallowRenderer  from "react-test-renderer/shallow";

import mockCatList from "../../src/data/cats.json";
import { CardList } from "../../src/js/components/cardList.jsx";


describe("Given the CardList component", () => {
	const shallowRenderer = new ReactShallowRenderer ();
	let tree;
	let mockRequiredPropFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<CardList
				items={ mockCatList }
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
