import React from "react";
import { shallow } from "enzyme";

import Card from "../../src/js/components/card.jsx";


describe("Given the Card component", () => {
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow(
			<Card
				id="2"
				name="Fluffy"
				onClick={ function() {} } />
		);
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(wrapper.name()).toBe("article");
			expect(wrapper.childAt(0).name()).toBe("div");
			expect(wrapper.childAt(1).name()).toBe("div");
			expect(wrapper.find(".card__body-title").text()).toBe("Fluffy");
		});
	});
	
	describe("When the card is clicked", () => {
		it("Should select the card", () => {
			expect(wrapper.hasClass("card--selected")).toBe(false);
			
			wrapper.setProps({ itemSelected: "2" });
			
			expect(wrapper.hasClass("card--selected")).toBe(true);
		});
	});
	
});
