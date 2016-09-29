import React from "react";


export default (props) => (
	<article onClick={props.onSelected} 
		 className={props.itemSelected === props.id ? "card card--selected" : "card"}>
		<div className="card__photo">
			<div className="card__photo-img" style={{backgroundImage: `url('img/${props.id}.jpg')`}} alt="Cat Image" ></div>
			<p className="card__photo-name" >{props.name}</p>
		</div>
		<div className="card__body" >
			<h1 className="card__body-title" >{props.name}</h1>
			<p className="card__body-text" >{props.description}</p>
		</div>
	</article>
)
