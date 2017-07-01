import { createSelector } from "reselect";


export const filterItems = createSelector(
	[
		state => state.items,
		state => state.filterString
	],
	(items, filterString) => {
		if (filterString)
			return items.filter(item => {
				let itemKeys = Object.keys(item);
				for (let n=0; n<itemKeys.length; ++n)
					if (item[itemKeys[n]] && item[itemKeys[n]].toLowerCase().indexOf(filterString.toLowerCase()) > -1)
						return true;
				return false;
			});
		return items;
	}
);
