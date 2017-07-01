import React from "react";
import { shallow } from "enzyme";

import CardFilter from "../../src/js/components/cardFilter.jsx";


describe("Given the CardFilter component", () => {
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			const wrapper = shallow(
				<CardFilter
					onChange={ function() {} } />
			);
			
			expect(wrapper.name()).toBe("input");
			expect(wrapper.prop("placeholder")).toBe("Type to filter by name or description");
			expect(wrapper.prop("onChange")).toEqual(jasmine.any(Function));
		});
	});
	
});
