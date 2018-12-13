import { combineReducers } from "redux";

import c from "./actionTypes";
import {ICardProps} from "../components/card";

export interface IReduxState {
	catSelected: string
	cats: ICardProps[]
	filterString: string
}

function catSelected(state = "", action): string {
	switch (action.type) {
		case c.CAT_SELECTED:		return state === action.id ? "" : action.id;
		default:					return state;
	}
}

function cats(state = [], action) : ICardProps[] {
	switch (action.type) {
		case c.CATS_REQUESTED:		return state;
		case c.CATS_RECEIVED:		return action.payload;
		case c.CATS_RECEIVED_ERROR:	return state;
		default:					return state;
	}
}

function filterString(state = "", action): string {
	switch (action.type) {
		case c.FILTER_STRING_SET:	return action.filterString;
		default:					return state;
	}
}

export default combineReducers<IReduxState>({
	catSelected,
	cats,
	filterString
});
