import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import actions from "../redux/actions";
import { filterItems } from "../redux/selectors";
import Card from "../components/card.jsx";
import CardFilter from "../components/cardFilter.jsx";

export class CardList extends React.Component {
	constructor(props) {
		super();
		
		this.setSelectedBound = props.setSelected.bind(this);
		this.setFilterStringBound = props.setFilterString.bind(this);
	}
	
	componentDidMount() {
		if (this.props.items.length === 0)
			this.props.requestItems();
	}
	
	render() {
		return (
			<div>
				<CardFilter onChange={ this.setFilterStringBound } value={ this.props.filterString } />
				<CSSTransitionGroup
					transitionName="card-list"
					transitionEnterTimeout={ 250 }
					transitionLeaveTimeout={ 250 } >
					{
						this.props.items.map(item =>
							<Card
								key={ item.id }
								id={ item.id }
								name={ item.name }
								description={ item.description }
								itemSelected={ this.props.itemSelected }
								onClick={ this.setSelectedBound } >
							</Card>
						)
					}
				</CSSTransitionGroup>
			</div>
		);
	}
}

CardList.displayName = "CardList";

CardList.propTypes = {
	filterString: PropTypes.string,
	itemSelected: PropTypes.string,
	items: PropTypes.array,
	requestItems: PropTypes.func,
	setFilterString: PropTypes.func,
	setSelected: PropTypes.func,
};

const mapStateToProps = state => ({
	items: filterItems(state),
	itemSelected: state.itemSelected,
	filterString: state.filterString
});
const mapDispatchToProps = dispatch => ({
	requestItems: () => dispatch(actions.requestItems()),
	setSelected: id => () => dispatch(actions.setSelected(id)),
	setFilterString: event => dispatch(actions.setFilterString(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
