import { combineReducers } from 'redux';
// import ReactUpdate from 'react-addons-update';
import c from "./actionsConstants";


const reducerItems = (state = [], action) => {
	switch (action.type) {
		case c.REQUEST_ITEMS:		return state;
		case c.RECEIVE_ITEMS:		return action.items;
		case c.RECEIVE_ITEMS_ERROR:	return state;
		default:					return state;
	}
};

const reducerItemSelected = (state = "", action) => {
	switch (action.type) {
		case c.SET_CARD_SELECTED:	return state === action.card.id ? "" : action.card.id;
		default:					return state;
	}
};

const reducerFilterString = (state = "", action) => {
	switch (action.type) {
		case c.SET_FILTER_STRING:	return action.filterString;
		default:					return state;
	}
};

export default combineReducers({
	items: reducerItems,
	itemSelected: reducerItemSelected,
	filterString: reducerFilterString
});
