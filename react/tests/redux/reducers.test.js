import combinedReducers from "../../src/js/redux/reducers";
import catList from "../../src/data/cats.json";


describe("Given reducer functions", () => {
	describe("When the RECEIVE_CATS action is received", () => {
		it("It should modify state accordingly", () => {
			const state = combinedReducers(
				{
					items: [],
					itemSelected: "",
					filterString: ""
				},
				{
					type:"RECEIVE_CATS",
					items: catList
				});
				
			expect(state.items.length).toBe(4);
			expect(state.items[1].name).toBe("Fluffy");
			expect(state.items[2].name).toBe("Luna");
			expect(state.items[3].name).toBe("Bella");
		});
	});
	
	describe("When the SET_CAT_SELECTED action is received", () => {
		it("It should modify state accordingly", () => {
			const state = combinedReducers(
				{
					itemSelected: "",
					filterString: ""
				},
				{
					type: "SET_CAT_SELECTED",
					id: "4"
				});
			
			expect(state.itemSelected).toBe("4");
		});
	});
	
	describe("When the SET_FILTER_STRING action is received", () => {
		it("It should modify state accordingly", () => {
			const state = combinedReducers(
				{
					items: catList	,
					itemSelected: "",
					filterString: ""
				}, {
					type: "SET_FILTER_STRING",
					filterString: "fuffly"
				});
				
			expect(state.filterString).toEqual("fuffly");
		});
	});
});
