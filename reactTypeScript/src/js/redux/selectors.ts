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
				for (const catKey of Object.values(cat))
					return catKey.toLowerCase().includes(filterString.toLowerCase())
			});
		return cats;
	}
);
