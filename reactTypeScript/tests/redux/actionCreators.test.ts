import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import actionCreators from "../../src/js/redux/actionCreators";
import actionTypes from "../../src/js/redux/actionTypes";
import catList from "../cats";
import catListSorted from "../../tests/catsSortedByName";


describe("Given Redux actionCreators", () => {
	const mockStore = configureMockStore([ thunk ]);
	const store = mockStore({ transactions: [] });
	
	describe("When the requestCats action creator is executed", () => {
		beforeAll(() => {
			nock(/http:\/\/localhost:3001/).get("/data/cats.json").reply(200, catList);
		});
		
		beforeEach(() => {
			store.clearActions();
		});
		
		it("Should dispatch the CATS_RECEIVED action with expected type and data load", () => {
			return store.dispatch(actionCreators.requestCats("/data/cats.json")).then(() => {
				expect(store.getActions()[0]).toEqual({ type: actionTypes.CATS_RECEIVED, payload: catListSorted });
			});
		});
		
		describe("When there is some connection error", () => {
			it("Should dispatch the CATS_RECEIVED_ERROR action with expected type and data load", () => {
				return store.dispatch(actionCreators.requestCats("http://incorrectTestingUrl.com")).then(() => {
					expect(store.getActions()[0].type).toEqual(actionTypes.CATS_RECEIVED_ERROR);
				});
			});
		});
	});
	
	describe("When the setSelected action creator is executed", () => {
		it("Should dispatch the CAT_SELECTED action with expected type and data load", () => {
			expect(actionCreators.setSelected("2")).toEqual({ type: actionTypes.CAT_SELECTED, id: "2" });
		});
	});
	
	describe("When the setFilterString action creator is executed", () => {
		it("Should dispatch the FILTER_STRING_SET action with expected type and data load", () => {
			expect(actionCreators.setFilterString("flu")).toEqual({ type: actionTypes.FILTER_STRING_SET, filterString: "flu" });
		});
	});
});
