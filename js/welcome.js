var welButton = document.querySelector(".wel-button-mobile");
var welcomeMenu = document.querySelector(".welcome_list");

welButton.addEventListener("click", function(){
	if (welcomeMenu.classList.contains("menu-mobile--close")) {
		welcomeMenu.classList.remove("menu-mobile--close");
	}
	else {
		welcomeMenu.classList.add("menu-mobile--close");
	}
});
