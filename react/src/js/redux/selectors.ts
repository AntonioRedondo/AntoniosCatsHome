import { createSelector } from "reselect";


export const filterCats = createSelector(
	[
		state => state.cats,
		state => state.filterString
	],
	(cats, filterString) => {
		if (filterString)
			return cats.filter(cat => {
				let catKeys = Object.keys(cat);
				for (let n=0; n<catKeys.length; ++n)
					if (cat[catKeys[n]] && cat[catKeys[n]].toLowerCase().indexOf(filterString.toLowerCase()) > -1)
						return true;
				return false;
			});
		return cats;
	}
);
