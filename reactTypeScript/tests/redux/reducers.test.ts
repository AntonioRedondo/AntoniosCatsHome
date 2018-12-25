import reducers, {IReduxState} from "../../src/js/redux/reducers";
import actionTypes from "../../src/js/redux/actionTypes";
import catList from "../cats";


describe("Given reducer functions", () => {
	const mockDefaultState: IReduxState = {
		catSelected: "",
		cats: [],
		filterString: ""
	}
	
	describe("When the CATS_RECEIVED action is received", () => {
		it("It should modify state accordingly", () => {
			const state: IReduxState = reducers(
				mockDefaultState,
				{
					type: actionTypes.CATS_RECEIVED,
					payload: catList
				});
				
			expect(state.cats.length).toBe(4);
			expect(state.cats[1].name).toBe("Fluffy");
			expect(state.cats[2].name).toBe("Luna");
			expect(state.cats[3].name).toBe("Bella");
		});
	});
	
	describe("When the CAT_SELECTED action is received", () => {
		it("It should modify state accordingly", () => {
			const state = reducers(
				mockDefaultState,
				{
					type: actionTypes.CAT_SELECTED,
					id: "4"
				});
			
			expect(state.catSelected).toBe("4");
		});
	});
	
	describe("When the FILTER_STRING_SET action is received", () => {
		it("It should modify state accordingly", () => {
			const state = reducers(
				mockDefaultState,
				{
					type: actionTypes.FILTER_STRING_SET,
					filterString: "fuffly"
				});
				
			expect(state.filterString).toEqual("fuffly");
		});
	});
});
