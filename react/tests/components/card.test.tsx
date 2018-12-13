import * as React from "react";
import * as Renderer from "react-test-renderer";
import "jest-styled-components";

import Card from "../../src/js/components/card";
import v from "../../src/js/style/variables";


describe("Given the Card component", () => {
	let component;
	let tree;
	let mockFunction = () => {};
	
	describe("When the component is mounted", () => {
		beforeEach(() => {
			component = Renderer.create(
				<Card
					id="2"
					name="Fluffy"
					onClick={ mockFunction } />
			);
			tree = component.toJSON();
		});
		
		it("Should render children", () => {
			expect(tree).toMatchSnapshot();
		});
	});
	
	describe("When the card is clicked", () => {
		it("Should select the card", () => {
			expect(tree).toHaveStyleRule("background", v.grayE);
			
			component = Renderer.create(
				<Card
					id="2"
					name="Fluffy"
					onClick={ mockFunction }
					catSelected={ true } />
			);
			tree = component.toJSON();
			
			expect(tree).toHaveStyleRule("background", "papayawhip");
		});
	});
});
