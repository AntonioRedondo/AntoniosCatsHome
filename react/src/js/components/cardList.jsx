import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import actionCreators from "../redux/actionCreators";
import { filterItems } from "../redux/selectors";
import Card from "./card.jsx";
import v from "../style/variables";

export class CardList extends Component {
	constructor(props) {
		super();
		
		this.setSelected = props.setSelected.bind(this);
	}
	
	componentDidMount() {
		if (this.props.items.length === 0)
			this.props.requestCatList();
	}
	
	shouldComponentUpdate({ items, itemSelected }) {
		return items.length !== this.props.items.length
				|| itemSelected !== this.props.itemSelected;
	}
	
	_renderCards() {
		return this.props.items.map(item =>
			<CSSTransition
				key={ item.id }
				classNames="card-list"
				timeout={ v.time2 } >
				<Card
					key={ item.id }
					id={ item.id }
					name={ item.name }
					description={ item.description }
					itemSelected={ this.props.itemSelected }
					onClick={ this.props.setSelected } >
				</Card>
			</CSSTransition>
		);
	}
	
	render() {
		return <TransitionGroup>{ this._renderCards() }</TransitionGroup>;
	}
}

CardList.displayName = "CardList";

CardList.propTypes = {
	itemSelected: PropTypes.string,
	items: PropTypes.array.isRequired,
	requestCatList: PropTypes.func.isRequired,
	setSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	items: filterItems(state),
	itemSelected: state.itemSelected
});
const mapDispatchToProps = dispatch => ({
	requestCatList: () => dispatch(actionCreators.requestCatList()),
	setSelected: id => () => dispatch(actionCreators.setSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
