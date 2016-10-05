var bodyCats = document.getElementsByClassName("body-cats")[0],
	bodyHowToAdopt = document.getElementsByClassName("body-how-to-adopt")[0],
	tabCats = document.getElementsByClassName("tab-cats")[0],
	tabHowToAdopt = document.getElementsByClassName("tab-how-to-adopt")[0];
	
document.getElementsByClassName("tab-cats")[0].addEventListener("click", function(e) {
	tabCats.classList.add("navigation__tab--active");
	tabHowToAdopt.classList.remove("navigation__tab--active");
	bodyHowToAdopt.classList.add("body--out");
	bodyCats.classList.remove("body--out");
});

document.getElementsByClassName("tab-how-to-adopt")[0].addEventListener("click", function(e) {
	tabCats.classList.remove("navigation__tab--active");
	tabHowToAdopt.classList.add("navigation__tab--active");
	bodyHowToAdopt.classList.remove("body--out");
	bodyCats.classList.add("body--out");
});



cardList.init("data/cats.json", document.getElementsByClassName("filter")[0]);
