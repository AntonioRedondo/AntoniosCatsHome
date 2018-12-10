import { createSelector } from "reselect";
import { ICardProps } from "../components/card";

export const filterCats = createSelector(
	[
		(state: any): ICardProps[] => state.cats,
		(state: any): string => state.filterString
	],
	(cats, filterString) => {
		if (filterString)
			return cats.filter(cat => {
				const catKeys = Object.keys(cat);
				for (const catKey of catKeys)
					if (catKey && catKey.toLowerCase().indexOf(filterString.toLowerCase()) > -1)
						return true;
				return false;
			});
		return cats;
	}
);
