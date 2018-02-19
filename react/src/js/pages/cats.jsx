import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import actionCreators from "../redux/actionCreators";

import CardFilter from "../components/cardFilter.jsx";
import CardList from "../components/cardList.jsx";

export function Cats(props) {
	return (
		<div>
			<CardFilter onChange={ props.setFilterString } value={ props.filterString } />
			<CardList/>
		</div>
	);
}

Cats.propTypes = {
	filterString: PropTypes.string,
	setFilterString: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	filterString: state.filterString
});
const mapDispatchToProps = dispatch => ({
	setFilterString: event => dispatch(actionCreators.setFilterString(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
