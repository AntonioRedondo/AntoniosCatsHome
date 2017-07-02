import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import XML from "xmlhttprequest";

import actions from "../../src/js/redux/actions.js";
import c from "../../src/js/redux/actionsConstants.js";
import mockCatList from "../../src/data/cats.json";
import mockCatListSorted from "../../tests/catsSortedByName.json";


describe("Given the Redux actions", () => {
	const mockStore = configureMockStore([ thunk ]);
	const store = mockStore({ transactions: [] });
	const expectedAction = { type: c.RECEIVE_ITEMS, items: mockCatListSorted };
	
	describe("When a RECEIVE_ITEMS disptacher is executed", () => {
		beforeAll(()=> {
			XMLHttpRequest = XML.XMLHttpRequest; // eslint-disable-line no-global-assign
			nock(/\*/).get("/data/cats.json").reply(200, { body: { response: { mockCatList } } });
		});
		
		it("Should dispatch the expected action with the expected data load", () => {
			store.dispatch(actions.requestItems("http://localhost:3000/data/cats.json")).then(() => {
				expect(store.getActions()[0]).toEqual(expectedAction);
			});
		});
	});
	
	describe("When a SET_CARD_SELECTED disptacher is executed", () => {
		it("Should dispatch the expected action with the expected data load", () => {
			store.dispatch(actions.requestItems("http://localhost:3000/data/cats.json")).then(() => {
				expect(store.getActions()[0]).toEqual(expectedAction);
			});
		});
	});
});
