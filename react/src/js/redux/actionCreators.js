import axios from "axios";

import { sortByName } from "../helpers";
import c from "./actionTypes";


export default {
	requestCats(url = "data/cats.json") {
		return dispatch => {
			return axios.get(url)
				.then(response => dispatch({ type: c.RECEIVE_CATS, payload: sortByName(response.data) }))
				.catch(error => dispatch({ type: c.RECEIVE_CATS_ERROR, error }));
		};
	},
	
	setSelected(id) {
		return {
			type: c.SET_CAT_SELECTED,
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
