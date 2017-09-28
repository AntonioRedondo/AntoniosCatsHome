import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import actionCreators from "../redux/actionCreators";
import CardFilter from "../components/cardFilter.jsx";
import CardList from "../components/cardList.jsx";

export class Cats extends React.Component {
	constructor(props) {
		super();
		
		this.setFilterStringBound = props.setFilterString.bind(this);
	}
	
	render() {
		return (
			<div>
				<CardFilter onChange={ this.setFilterStringBound } value={ this.props.filterString } />
				<CardList/>
			</div>
		);
	}
}

Cats.displayName = "Cats";

Cats.propTypes = {
	filterString: PropTypes.string,
	setFilterString: PropTypes.func,
};

const mapStateToProps = state => ({
	filterString: state.filterString
});
const mapDispatchToProps = dispatch => ({
	setFilterString: event => dispatch(actionCreators.setFilterString(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
