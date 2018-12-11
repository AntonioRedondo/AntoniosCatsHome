import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import actionCreators from "../redux/actionCreators";
import { filterCats } from "../redux/selectors";

import Card, { ICardProps } from "./card";
import v from "../style/variables";

interface ICardListProps {
	catSelected?: string
	cats?: ICardProps[]
	requestCats?: () => void
	setSelected?: (id: string) => any
}

export class CardList extends Component<ICardListProps> {
	componentDidMount() {
		!this.props.cats.length && this.props.requestCats();
	}
	
	shouldComponentUpdate(nextProps) {
		const { cats, catSelected } = nextProps;
		
		return cats.length !== this.props.cats.length || catSelected !== this.props.catSelected;
	}
	
	renderCards = () => {
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
					catSelected={ this.props.catSelected === cat.id }
					onClick={ this.props.setSelected } />
			</CSSTransition>
		);
	}
	
	render() {
		return <TransitionGroup>{ this.renderCards() }</TransitionGroup>;
	}
}

const mapStateToProps = state => ({
	catSelected: state.catSelected,
	cats: filterCats(state)
});
const mapDispatchToProps = dispatch => ({
	requestCats: () => dispatch(actionCreators.requestCats()),
	setSelected: id => () => dispatch(actionCreators.setSelected(id))
});

export default connect<{}, {}, ICardListProps>(mapStateToProps, mapDispatchToProps)(CardList);
