
/*slider*/

$('.slider .bxslider').bxSlider({
	  	  mode: 'fade',
	  	  randomStart: true,
	  	  controls: false,
		  auto: true,
		  autoControls: false,
		  stopAutoOnClick: false,
		  pause: 5000,
		  speed: 1000,
		  pager: false
});

$('.slider2 .bxslider').bxSlider({

});

/*button for mobile*/
var button = document.querySelector(".button-mobile");
var menu = document.querySelector(".menu");

button.addEventListener("click", function(){
	if (menu.classList.contains("main-menu-mobile--close")) {
		menu.classList.remove("main-menu-mobile--close");
	}
	else {
		menu.classList.add("main-menu-mobile--close");
	}
});



