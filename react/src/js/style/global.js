import v from "./variables";

export default `
	@import "https://fonts.googleapis.com/css?family=Open+Sans:300,400,800|Rokkitt:400,700";

	body {
		height: 100%;
		min-height: 100%;
		margin: 0;
		overflow-x: hidden;
		overflow-y: scroll;
		
		background: url("img/bg.png");
		
		color: ${ v.gray3 };
		font-family: "Open Sans", sans-serif;
	}

	a {
		color: ${ v.grayB };
		text-decoration: none;
		font-weight: bold;
	}

	input:focus {
		outline: none;
	}

	* {
		box-sizing: border-box;
	}
	
	.tab-navigator--active {
		background: ${ v.purple2 };
	}

	.navigation-loader {
		&-enter&-enter {
			width: 100%;
			position: absolute;
			z-index: 1;
			opacity: 0;
			transform: translate3d(8%, 0, 0);
		}
		
		&-enter&-enter-active {
			opacity: 1;
			transform: translate3d(0, 0, 0);
			transition: ${ v.time2 + v.ms };
		}
		
		&-exit&-exit {
			opacity: 1;
		}
		
		&-exit&-exit-active {
			opacity: 0;
			transition: ${ v.time2 + v.ms };
		}
	}
	
	.card-list {
		&-enter&-enter {
			max-height: 0;
			margin: 0;
			opacity: 0;
		}
		
		&-enter&-enter-active {
			max-height: 250px;
			margin: 0 0 40px;
			opacity: 1;
			transition: ${ v.time2 + v.ms } ease-out;
		}
		
		&-exit&-exit {
			max-height: 250px;
			margin: 0 0 40px;
			opacity: 1;
		}
		
		&-exit&-exit-active {
			max-height: 0;
			margin: 0;
			opacity: 0;
			transition: ${ v.time2 + v.ms } ease-in;
		}
	}
`;
