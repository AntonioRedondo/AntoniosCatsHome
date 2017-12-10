import { combineReducers } from "redux";

import c from "./actionTypes";


function cats(state = [], action) {
	switch (action.type) {
		case c.REQUEST_CATS:		return state;
		case c.RECEIVE_CATS:		return action.payload;
		case c.RECEIVE_CATS_ERROR:	return state;
		default:					return state;
	}
}

function catSelected(state = "", action) {
	switch (action.type) {
		case c.SET_CAT_SELECTED:	return state === action.id ? "" : action.id;
		default:					return state;
	}
}

function filterString(state = "", action) {
	switch (action.type) {
		case c.SET_FILTER_STRING:	return action.filterString;
		default:					return state;
	}
}

export default combineReducers({
	cats,
	catSelected,
	filterString
});
