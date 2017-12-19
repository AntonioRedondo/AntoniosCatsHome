import axios from "axios";

import { sortByName } from "../helpers";
import c from "./actionTypes";


export default {
	requestCats(url = "data/cats.json") {
		return dispatch => {
			return axios.get(url)
				.then(response => dispatch({ type: c.CATS_RECEIVED, payload: sortByName(response.data) }))
				.catch(error => dispatch({ type: c.CATS_RECEIVED_ERROR, error }));
		};
	},
	
	setSelected(id) {
		return {
			type: c.CAT_SELECTED,
			id
		};
	},
	
	setFilterString(filterString) {
		return {
			type: c.FILTER_STRING_SET,
			filterString
		};
	}
};
