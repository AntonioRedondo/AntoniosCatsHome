import reducers from "../../src/js/redux/reducers";
import mockCatList from "../../src/data/cats.json";


describe("reducers", () => {
	it("Should handle RECEIVE_ITEMS action", () => {
		let state = reducers(
			{
				items: [],
				itemSelected: "",
				filterString: ""
			},
			{
				type:"RECEIVE_ITEMS",
				items: mockCatList
			});
			
		expect(state.items.length).toBe(4);
		expect(state.items[1].name).toBe("Fluffy");
		expect(state.items[2].name).toBe("Luna");
		expect(state.items[3].name).toBe("Bella");
	});
	
	
	it("Should handle SET_CARD_SELECTED action", () => {
		let state = reducers(
			{
				itemSelected: "",
				filterString: ""
			},
			{
				type: "SET_CARD_SELECTED",
				id: "4"
			});
		
		expect(state.itemSelected).toBe("4");
	});
	
	
	it("should handle SET_FILTER_STRING action", () => {
		let state = reducers(
			{
				items: mockCatList,
				itemSelected: "",
				filterString: ""
			}, {
				type: "SET_FILTER_STRING",
				filterString: "lit"
			});
			
		expect(state.filterString).toEqual("lit");
	});
});
