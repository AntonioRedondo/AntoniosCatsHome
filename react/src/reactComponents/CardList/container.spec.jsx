import React from "react";
import TestUtils from "react-addons-test-utils";
import JasmineAjax from "jasmine-ajax";
import { Provider } from "react-redux";
import ReduxStore from "./redux/store";
import CardListRedux from "./container.jsx";
import { CardList } from "./container.jsx";
import { mount } from "enzyme";

describe("CardList test", () => {
	
	/* jshint -W110 */
	const jsonString = '[{"id":"1","name":"Little Sock","description":"Little Sock was brought to Tony\'s Cats Home as his owners were moving house and couldn\'t take him with them. He is an affectionate boy that loves nothing more than being stroked and sitting on a lap having extra cuddles, he will purr with delight. "},{"id":"2","name":"Fluffy","description":"He is a young and active cat. If owners work full-time he will need cat flap access to outside so he can come and go as he pleases throughout the day. Fluffly is a true rescue cat who will make a lovely companion when settled in his new home."},{"id":"3","name":"Luna","description":"Luna is a real sweetie who loves nothing more than a good snuggle up to her favourite people. She is also very playful and loves to play string toy games. She will make a great addition to the family and will provide a lot of love and laughter through the years! "},{"id":"4","name":"Bella","description": "She is a loving and playful youngster that enjoys interacting with people, being stroked and groomed, she is a cuddly girl. Being young and active Bella will need cat flap access to outside if owners are working full-time, she loves exploring her territory, playing and sunbathing. "}]';
	/* jshint +W110 */
	
	
	
	beforeEach(() => {
		jasmine.Ajax.install(); // Nor Jasmine nor JasmineAjax are ES6 modules. But the ES6 import at the top is still required
	});
	
	
	
	afterEach(() => {
		jasmine.Ajax.uninstall();
	});
	
	
	
	it("Should make an AJAX call and render CardListRedux", () => {		
		const wrapper = mount(
				<Provider store={ReduxStore}>
					<CardListRedux url="data/cats.json" />
				</Provider>
		);
		
		const request = jasmine.Ajax.requests.mostRecent();
		request.respondWith({ status: 200, responseText: jsonString });
		expect(request.url).toBe("data/cats.json");
		expect(request.method).toBe("GET");
				
		expect(wrapper.find(".card__photo").first().name()).toBe("div");
		expect(wrapper.find(".card__photo-name").first().text()).toBe("Bella");
		expect(wrapper.find(".card").length).toBe(4);
	});
	
	
	
	it("Should make an AJAX call and render CardList", () => {
		
		// If we want to test in isolation CardList we must pass 'items', 'setSelected' and 'requestItems' as props
		// since they are initially created by Redux connect():
		const wrapper = mount(<CardList
				items={JSON.parse(jsonString)}
				setSelected={function(){}}
				requestItems={function(){}}/>
		);
				
		expect(wrapper.find(".card__photo").first().name()).toBe("div");
		expect(wrapper.find(".card__photo-name").first().text()).toBe("Little Sock");
		expect(wrapper.find(".card").length).toBe(4);
		
		// Tests without Enzyme
		const cardList = TestUtils.renderIntoDocument(
			<CardList
				items={JSON.parse(jsonString)}
				setSelected={function(){}}
				requestItems={function(){}}/>
		);
		
		expect(TestUtils.scryRenderedDOMComponentsWithClass(cardList, "card__photo")[0].tagName.toLowerCase()).toBe("div");
		expect(TestUtils.scryRenderedDOMComponentsWithClass(cardList, "card__photo-name")[0].innerHTML).toBe("Little Sock");
		expect(TestUtils.scryRenderedDOMComponentsWithClass(cardList, "card").length).toBe(4);
	});
	
});
