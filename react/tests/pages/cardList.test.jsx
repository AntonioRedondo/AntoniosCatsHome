import React from "react";
import { shallow } from "enzyme";

import { CardList } from "../../src/js/pages/cardList.jsx";
import mockCatList from "../../src/data/cats.json";


describe("Given the CardList component", () => {
	let mockRequiredPropFunction;
	
	beforeAll(() => {
		mockRequiredPropFunction = () => {};
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			const wrapper = shallow(
				<CardList
					items={ mockCatList }
					setFilterString={ mockRequiredPropFunction }
					setSelected={ mockRequiredPropFunction }  />
			);
			
			expect(wrapper.name()).toBe("div");
			expect(wrapper.childAt(0).name()).toBe("CardFilter");
			expect(wrapper.childAt(1).name()).toBe("CSSTransitionGroup");
			expect(wrapper.find("Card").length).toBe(4);
		});
	});
	
});
