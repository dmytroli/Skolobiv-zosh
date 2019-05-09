var welButton = document.querySelector(".wel-button-mobile");
var welcomeMenu = document.querySelector(".welcome_list");

welButton.addEventListener("click", function(){
	if (welcomeMenu.classList.contains("welcome_list-mobile--close")) {
		welcomeMenu.classList.remove("welcome_list-mobile--close");
	}
	else {
		welcomeMenu.classList.add("welcome_list-mobile--close");
	}
});
