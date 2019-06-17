var masElementRight = document.querySelectorAll(".all-news__item:nth-child(even)");
var masElementLeft = document.querySelectorAll(".all-news__item:nth-child(odd)");
console.log(masElementRight);
console.log(masElementLeft);

for (var i=0; i < masElementRight.length; i++) {
	masElementRight[i].className += " wow fadeInRight";
}
for (var i=0; i < masElementLeft.length; i++) {
	masElementLeft[i].className += " wow fadeInLeft";
}