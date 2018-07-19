import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import actionCreators from "../redux/actionCreators";

import CardFilter from "../components/cardFilter";
import CardList from "../components/cardList";

interface CatsProps {
	filterString?: string,
	setFilterString?: (event: React.ChangeEvent<HTMLInputElement>) => void, // It should be compulsory, but annoying TS error complains if compulsory: semantic error TS2322 Type '{}' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<Component<
}

export function Cats(props: CatsProps) {
	return (
		<div>
			<CardFilter onChange={ props.setFilterString } value={ props.filterString } />
			<CardList/>
		</div>
	);
}

const mapStateToProps = state => ({
	filterString: state.filterString
});
const mapDispatchToProps = dispatch => ({
	setFilterString: event => dispatch(actionCreators.setFilterString(event.target.value))
});

export default connect<{}, {}, CatsProps>(mapStateToProps, mapDispatchToProps)(Cats);
