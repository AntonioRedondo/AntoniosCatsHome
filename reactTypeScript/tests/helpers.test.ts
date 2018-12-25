import { sortByName } from "../src/js/helpers";
import catList from "../tests/cats";
import catListSorted from "../tests/catsSortedByName";


describe("Given helper functions", () => {
	describe("When the sortByName function is executed", () => {
		it("Should sort array items by name", () => {
			expect(sortByName(catList)).toEqual(catListSorted);
		});
	});
});
