import React from "react";
import { shallow } from "enzyme";

import TabNavigator from "../../src/js/components/tabNavigator.jsx";


describe("Given the TabNavigator component", () => {
	const mockProps = {
		location: { pathname: "/how-to-adopt" }
	};
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			const wrapper = shallow(
				<TabNavigator { ...mockProps } />
			);
			
			expect(wrapper.name()).toBe("div");
			expect(wrapper.childAt(0).name()).toBe("nav");
			expect(wrapper.find("NavLink").length).toBe(2);
			expect(wrapper.childAt(1).name()).toBe("CSSTransitionGroup");
			expect(wrapper.childAt(1).childAt(0).name()).toBe("FadeElement");
			expect(wrapper.find("FadeElement").prop("pathname")).toBe("/how-to-adopt");
		});
	});
	
});
