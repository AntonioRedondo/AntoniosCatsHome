import React from "react";
import ReduxStore from "./redux/store";
import ReduxActions from "./redux/actions";
import { connect } from "react-redux";
import Card from "./card.jsx";
import Filter from "./filter.jsx";


export class CardList extends React.Component {
	
	componentDidMount() {
		this.props.requestItems();
	}
	
	onFilter(e) {
		this.props.setFilterString(e.target.value);
	}
	
	render() {
		let items = this.props.items.map((item) =>
			<Card
				key={item.id}
				id={item.id}
				name={item.name}
				information={item.information}
				itemSelected={this.props.itemSelected}
				onSelected={this.props.setSelected.bind(this, item)}>
			</Card>
		);
		
		return (
			<div className="card-list-container">
				<Filter onFilter={this.onFilter.bind(this)} />
				{items}
			</div>
		);
	}
	
}

CardList.propTypes = {
	items: React.PropTypes.array.isRequired,
	itemSelected: React.PropTypes.string,
	filterString: React.PropTypes.string
};

function filter(items, filterString) {
	if (filterString)
		return items.filter(cat => {
			let catKeys = Object.keys(cat);
			for (var n=0; n<catKeys.length; ++n)
				if (cat[catKeys[n]] && cat[catKeys[n]].toLowerCase().indexOf(filterString.toLowerCase()) > -1)
					return true;
			return false;
		});
	return items;
}

const mapStateToProps = state => ({
		items: filter(state.items, state.filterString),
		itemSelected: state.itemSelected,
		filterString: state.filterString
	});
const mapDispatchToProps = dispatch => ({
		requestItems: () => dispatch(ReduxActions.requestItems()),
		setSelected: item => dispatch(ReduxActions.setSelected(item)),
		setFilterString: filterString => dispatch(ReduxActions.setFilterString(filterString))
	});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
