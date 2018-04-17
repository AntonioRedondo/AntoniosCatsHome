import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import actionCreators from "../redux/actionCreators";
import { filterCats } from "../redux/selectors";

import Card from "./card.jsx";
import v from "../style/variables";

export class CardList extends Component {
	static propTypes = {
		catSelected: PropTypes.string,
		cats: PropTypes.array.isRequired,
		requestCats: PropTypes.func.isRequired,
		setSelected: PropTypes.func.isRequired,
	}
	
	componentDidMount() {
		!this.props.cats.length && this.props.requestCats();
	}
	
	shouldComponentUpdate({ cats, catSelected }) {
		return cats.length !== this.props.cats.length
				|| catSelected !== this.props.catSelected;
	}
	
	private renderCards = () => {
		return this.props.cats.map(cat =>
			<CSSTransition
				key={ cat.id }
				classNames="card-list"
				timeout={ v.time2 } >
				<Card
					key={ cat.id }
					id={ cat.id }
					name={ cat.name }
					description={ cat.description }
					catSelected={ this.props.catSelected }
					onClick={ this.props.setSelected } >
				</Card>
			</CSSTransition>
		);
	}
	
	render() {
		return <TransitionGroup>{ this.renderCards() }</TransitionGroup>;
	}
}

const mapStateToProps = state => ({
	cats: filterCats(state),
	catSelected: state.catSelected
});
const mapDispatchToProps = dispatch => ({
	requestCats: () => dispatch(actionCreators.requestCats()),
	setSelected: id => () => dispatch(actionCreators.setSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
