import React from "react";
import Renderer from "react-test-renderer/shallow";

import mockCatList from "../../src/data/cats.json";
import { CardList } from "../../src/js/components/cardList.jsx";


describe("Given the CardList component", () => {
	const shallowRenderer = new Renderer();
	let tree;
	let mockFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<CardList
				cats={ mockCatList }
				requestCats={ mockFunction }
				setSelected={ mockFunction } />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
