import axios from "axios";

import { sortByName } from "../helpers";
import actionTypes from "./actionTypes";

export default {
	requestCats(url = "data/cats.json") {
		return dispatch => {
			return axios.get(url)
				.then(response => dispatch({ type: actionTypes.CATS_RECEIVED, payload: sortByName(response.data) }))
				.catch(error => dispatch({ type: actionTypes.CATS_RECEIVED_ERROR, error }));
		};
	},
	
	setSelected(id) {
		return {
			id,
			type: actionTypes.CAT_SELECTED
		};
	},
	
	setFilterString(filterString) {
		return {
			filterString,
			type: actionTypes.FILTER_STRING_SET
		};
	}
};
