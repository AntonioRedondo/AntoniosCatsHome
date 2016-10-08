import "whatwg-fetch"; // https://github.com/webpack/webpack/issues/1831
import c from "./actionsConstants";


function sort(data) {
	return data.sort(function(a, b) {
		if (a.name < b.name)
			return -1;
		if (a.name > b.name)
			return 1;
		else return 0;
	});
};


const actions = {
	requestItems(url) {
		return (dispatch) => {
			dispatch({ type: c.REQUEST_ITEMS });
			var request = new XMLHttpRequest();
			request.addEventListener("load", function () {
				dispatch({ type: c.RECEIVE_ITEMS, items: sort(JSON.parse(request.responseText)) });
			});
			request.open("GET", url);
			try {
				request.send();
			} catch (e) {
				dispatch({ type: c.RECEIVE_ITEMS_ERROR })
			}
			
			// 'fetct' doesn't work when testing with Jasmine: https://github.com/jasmine/jasmine-ajax/issues/134
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(
			// 		items => dispatch({ type: c.RECEIVE_ITEMS, items: sort(items) }),
			// 		error => dispatch({ type: c.RECEIVE_ITEMS_ERROR })
			// 	);
		};
	},
	
	setSelected(card) {
		return {
			type: c.SET_CARD_SELECTED,
			card
		};
	},
	
	setFilterString(filterString) {
		return {
			type: c.SET_FILTER_STRING,
			filterString
		};
	}
};

export default actions;
