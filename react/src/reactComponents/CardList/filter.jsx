import React from "react";


export default (props) =>
	<input className="filter" type="text" placeholder="Type to filter by name or description" onChange={props.onFilter} />
