import "whatwg-fetch"; // https://github.com/github/fetch/issues/275#issuecomment-181784694

import { sortByName } from "../helpers";
import c from "./actionTypes";


export default {
	requestCatList(url = "data/cats.json") {
		return dispatch => {
			return fetch(url)
				// If only one .then() 'Promise { <pending> }' is returned
				.then(response => response.json())
				.then(
					items => dispatch({ type: c.RECEIVE_ITEMS, items: sortByName(items) }),
					error => dispatch({ type: c.RECEIVE_ITEMS_ERROR, error })
				);
		};
	},
	
	setSelected(id) {
		return {
			type: c.SET_CARD_SELECTED,
			id
		};
	},
	
	setFilterString(filterString) {
		return {
			type: c.SET_FILTER_STRING,
			filterString
		};
	}
};
