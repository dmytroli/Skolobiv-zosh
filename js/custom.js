
/*slider*/
jQuery(document).ready(function(){
  jQuery('.bxslider').bxSlider({
  	controls: true
  });
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


/*button font-size*/
var s12 = document.querySelector(".s-12");
var s14 = document.querySelector(".s-14");
var s16 = document.querySelector(".s-16");
var size = document.querySelector(".size");

s12.addEventListener("click", function(){
	if (s14.classList.contains("active-fontsize")) {
		s14.classList.remove("active-fontsize");
	}
	else {
		s16.classList.remove("active-fontsize");
		s12.classList.add("active-fontsize");
	}

});

s14.addEventListener("click", function(){
	if (s12.classList.contains("active-fontsize")) {
		s12.classList.remove("active-fontsize");
		
	}
	else {
		s16.classList.remove("active-fontsize");
		s14.classList.add("active-fontsize");
        size.style.fontSize = '16px';
	}

});

s16.addEventListener("click", function(){
	if (s12.classList.contains("active-fontsize")) {
		s12.classList.remove("active-fontsize");
	}
	else {
		s14.classList.remove("active-fontsize");
		s16.classList.add("active-fontsize");
	}

});
