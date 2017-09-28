import { combineReducers } from "redux";

import c from "./actionTypes";


function items(state = [], action) {
	switch (action.type) {
		case c.REQUEST_ITEMS:		return state;
		case c.RECEIVE_ITEMS:		return action.items;
		case c.RECEIVE_ITEMS_ERROR:	return state;
		default:					return state;
	}
}

function itemSelected(state = "", action) {
	switch (action.type) {
		case c.SET_CARD_SELECTED:	return state === action.id ? "" : action.id;
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
	items,
	itemSelected,
	filterString
});
