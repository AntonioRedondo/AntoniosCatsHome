import React from "react";
import { shallow } from "enzyme";

import HowToAdopt from "../../src/js/pages/howToAdopt.jsx";


describe("Given the HowToAdopt component", () => {
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			const wrapper = shallow(
				<HowToAdopt />
			);
			
			expect(wrapper.name()).toBe("div");
			expect(wrapper.childAt(0).name()).toBe("img");
			expect(wrapper.childAt(1).name()).toBe("p");
			expect(wrapper.childAt(1).text()).toContain("their profile");
		});
	});
	
});
