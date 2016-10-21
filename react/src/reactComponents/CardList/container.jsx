import React from "react";
import { Provider, connect } from "react-redux";
import ReduxStore from "./redux/store";
import ReduxActions from "./redux/actions";
import Card from "./card.jsx";
import Filter from "./filter.jsx";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


export class CardList extends React.Component {
	
	componentDidMount() {
		this.props.requestItems(this.props.url);
	}
	
	render() {
		let items = this.props.items.map((item) =>
			<Card
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				itemSelected={this.props.itemSelected}
				onSelected={this.props.setSelected.bind(this, item)}>
			</Card>
		);
		
		return (
			<div className="card-list-container">
				<Filter onFilter={this.props.setFilterString.bind(this)} />
				<ReactCSSTransitionGroup 
						transitionName="card" 
						transitionEnterTimeout={250} 
						transitionLeaveTimeout={250}>
					{items}
				</ReactCSSTransitionGroup>
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
			for (let n=0; n<catKeys.length; ++n)
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
		requestItems: url => dispatch(ReduxActions.requestItems(url)),
		setSelected: item => dispatch(ReduxActions.setSelected(item)),
		setFilterString: e => dispatch(ReduxActions.setFilterString(e.target.value))
	});
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
