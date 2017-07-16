import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Card from "../../src/js/components/card.jsx";
import v from "../../src/js/variables";


describe("Given the Card component", () => {
	let component;
	let tree;
	
	beforeEach(() => {
		component = renderer.create(
			<Card
				id="2"
				name="Fluffy"
				onClick={ function() {} } />
		);
		tree = component.toJSON();
	});
	
	describe("When the component is mounted", () => {
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
	describe("When the card is clicked", () => {
		it("Should select the card", () => {
			expect(tree).toHaveStyleRule("background", v.grayE);
			
			component = renderer.create(
				<Card
					id="2"
					name="Fluffy"
					onClick={ function() {} }
					itemSelected="2" />
			);
			tree = component.toJSON();
			
			expect(tree).toHaveStyleRule("background", "papayawhip");
		});
	});
	
});
