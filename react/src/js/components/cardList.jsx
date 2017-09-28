import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import actionCreators from "../redux/actionCreators";
import { filterItems } from "../redux/selectors";
import Card from "../components/card.jsx";
import v from "../style/variables";

export class CardList extends React.Component {
	constructor(props) {
		super();
		
		this.setSelected = props.setSelected.bind(this);
	}
	
	componentDidMount() {
		if (this.props.items.length === 0)
			this.props.requestItems();
	}
	
	shouldComponentUpdate({ items, itemSelected }) {
		return items.length !== this.props.items.length
				|| itemSelected !== this.props.itemSelected;
	}
	
	render() {
		return (
			<TransitionGroup>
				{
					this.props.items.map(item =>
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
								onClick={ this.setSelected } >
							</Card>
						</CSSTransition>
					)
				}
			</TransitionGroup>
		);
	}
}

CardList.displayName = "CardList";

CardList.propTypes = {
	itemSelected: PropTypes.string,
	items: PropTypes.array.isRequired,
	requestItems: PropTypes.func,
	setSelected: PropTypes.func,
};

const mapStateToProps = state => ({
	items: filterItems(state),
	itemSelected: state.itemSelected
});
const mapDispatchToProps = dispatch => ({
	requestItems: () => dispatch(actionCreators.requestItems()),
	setSelected: id => () => dispatch(actionCreators.setSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
