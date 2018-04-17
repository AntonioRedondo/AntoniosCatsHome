import { sortByName } from "../src/js/helpers";
import catList from "../src/data/cats.json";
import catListSorted from "../tests/catsSortedByName.json";


describe("Given helper functions", () => {
	describe("When the sortByName function is executed", () => {
		it("Should sort array items by name", () => {
			expect(sortByName(catList)).toEqual(catListSorted);
		});
	});
});
