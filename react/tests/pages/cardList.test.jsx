import React from "react";
import ReactShallowRenderer  from "react-test-renderer/shallow";
import "jest-styled-components";

import { CardList } from "../../src/js/pages/cardList.jsx";
import mockCatList from "../../src/data/cats.json";


describe("Given the CardList component", () => {
	const shallowRenderer = new ReactShallowRenderer ();
	let tree;
	let mockRequiredPropFunction = () => {};

	beforeEach(() => {
		shallowRenderer.render(
			<CardList
				items={ mockCatList }
				setFilterString={ mockRequiredPropFunction }
				setSelected={ mockRequiredPropFunction }  />
		);
		tree = shallowRenderer.getRenderOutput();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
});
