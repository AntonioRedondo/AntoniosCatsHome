import { combineReducers } from "redux";

import c from "./actionTypes";


function cats(state = [], action) {
	switch (action.type) {
		case c.CATS_REQUESTED:		return state;
		case c.CATS_RECEIVED:		return action.payload;
		case c.CATS_RECEIVED_ERROR:	return state;
		default:					return state;
	}
}

function catSelected(state = "", action) {
	switch (action.type) {
		case c.CAT_SELECTED:		return state === action.id ? "" : action.id;
		default:					return state;
	}
}

function filterString(state = "", action) {
	switch (action.type) {
		case c.FILTER_STRING_SET:	return action.filterString;
		default:					return state;
	}
}

export default combineReducers({
	cats,
	catSelected,
	filterString
});
