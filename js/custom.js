
/*slider*/

$('.slider .bxslider').bxSlider({
	  	  mode: 'fade',
	  	  randomStart: true,
	  	  controls: false,
		  auto: true,
		  autoControls: false,
		  stopAutoOnClick: false,
		  pager: true,
		  pause: 6000,
		  speed: 1000,
		  pager: false
});

$('.slider2 .bxslider').bxSlider({
	  	  mode: 'horizontal',
	  	  controls: true,
		  auto: false,
		  controls: true,
});

/*button for mobile*/
var button = document.querySelector(".button-mobile");
var menu = document.querySelector(".menu");

button.addEventListener("click", function(){
	if (menu.classList.contains("menu-mobile--close")) {
		menu.classList.remove("menu-mobile--close");
	}
	else {
		menu.classList.add("menu-mobile--close");
	}
});


