import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import XML from "xmlhttprequest";

import actionCreators from "../../src/js/redux/actionCreators.js";
import c from "../../src/js/redux/actionTypes.js";
import mockCatList from "../../src/data/cats.json";
import mockCatListSorted from "../../tests/catsSortedByName.json";


describe("Given the Redux actionCreators", () => {
	const mockStore = configureMockStore([ thunk ]);
	const store = mockStore({ transactions: [] });
	const expectedAction = { type: c.RECEIVE_ITEMS, items: mockCatListSorted };
	
	describe("When a RECEIVE_ITEMS disptacher is executed", () => {
		beforeAll(() => {
			XMLHttpRequest = XML.XMLHttpRequest; // eslint-disable-line no-global-assign
			nock(/localhost:3000/).get("/data/cats.json").reply(200, mockCatList);
		});
		
		it("Should dispatch the expected action with the expected data load", () => {
			return store.dispatch(actionCreators.requestItems("http://localhost:3000/data/cats.json")).then(() => {
				expect(store.getActions()[0]).toEqual(expectedAction);
			});
		});
	});
	
	describe("When a SET_CARD_SELECTED disptacher is executed", () => {
		it("Should dispatch the expected action with the expected data load", () => {
			return store.dispatch(actionCreators.requestItems("http://localhost:3000/data/cats.json")).then(() => {
				expect(store.getActions()[0]).toEqual(expectedAction);
			});
		});
	});
});
