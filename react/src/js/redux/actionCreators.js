import axios from "axios";

import { sortByName } from "../helpers";
import c from "./actionTypes";


export default {
	requestCatList(url = "data/cats.json") {
		return dispatch => {
			return axios.get(url)
				.then(response => dispatch({ type: c.RECEIVE_ITEMS, items: sortByName(response.data) }))
				.catch(error => dispatch({ type: c.RECEIVE_ITEMS_ERROR, error }));
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
