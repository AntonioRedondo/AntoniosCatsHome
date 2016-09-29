import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import JasmineAjax from "jasmine-ajax";
import { Provider } from "react-redux";
import ReduxStore from "./redux/store";
import ItemContainer from "./container.jsx";

describe("ItemContainer test", () => {
	
	const jsonString = '[{"id":"1","name":"Little Sock","description":"Little Sock was brought to Tony\'s Cats Home as his owners were moving house and couldn\'t take him with them. He is an affectionate boy that loves nothing more than being stroked and sitting on a lap having extra cuddles, he will purr with delight. "},{"id":"2","name":"Fluffy","description":"He is a young and active cat. If owners work full-time he will need cat flap access to outside so he can come and go as he pleases throughout the day. Fluffly is a true rescue cat who will make a lovely companion when settled in his new home."},{"id":"3","name":"Luna","description":"Luna is a real sweetie who loves nothing more than a good snuggle up to her favourite people. She is also very playful and loves to play string toy games. She will make a great addition to the family and will provide a lot of love and laughter through the years! "},{"id":"4","name":"Bella","description": "She is a loving and playful youngster that enjoys interacting with people, being stroked and groomed, she is a cuddly girl. Being young and active Coco will need cat flap access to outside if owners are working full-time, she loves exploring her territory, playing and sunbathing. "}]';
	let JasmineAjax2;
	
	
	
	beforeEach(() => {
		/*
		 For some annoying reason as of:
			- Jasmine 2.4.0
			- Jasmine Ajax 3.2.0
			- Karma Jasmine 0.3.8
			JasmineAjax is populated as an empty Object.
			This extra if conditional is to populate the JasmineAjax object properly.
			JasmineAjax variable is read-only so we need an extra variable JasmineAjax2
		*/
		JasmineAjax2 = JasmineAjax;
		if (!JasmineAjax2.install) {
			JasmineAjax2 = jasmine.Ajax;
		}
		JasmineAjax2.install();
	});
	
	
	
	afterEach(() => {
		JasmineAjax2.uninstall();
	});
	
	
	
	it("Should make an AJAX call and render", () => {
		
		const creditCardList = ReactTestUtils.renderIntoDocument(
			// <ItemContainer url="data/cats.json"/>
			<Provider store={ReduxStore}>
				<ItemContainer />
			</Provider>
		);
		
		const request = JasmineAjax2.requests.mostRecent();
		request.respondWith({ status: 200, responseText: jsonString });
		expect(request.url).toBe("data/cats.json");
		expect(request.method).toBe("GET");
		
		// console.log(creditCardList);
		// console.log(ReactTestUtils.scryRenderedDOMComponentsWithClass(creditCardList, "credit-card__title"));
		// console.log(ReactTestUtils.scryRenderedDOMComponentsWithClass(creditCardList, "credit-card__title").length);
		
		// expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(creditCardList, "credit-card__title")[0].tagName.toLowerCase()).toBe("h2");
		// expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(creditCardList, "credit-card__title").length).toBe(4);
		// expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(creditCardList, "credit-card__title")[0].innerHTML).toBe("Halifax Credit Card");
	});
	
});
