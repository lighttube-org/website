const screenshots = [
	"img/screenshots/0.png",
	"img/screenshots/1.png",
	"img/screenshots/2.png",
	"img/screenshots/3.png",
	"img/screenshots/4.png",
];

let currentScreenshot = -1;

function updateScreenshot() {
	currentScreenshot = (currentScreenshot + 1) % screenshots.length;
	document.getElementById("screenshot").src = screenshots[currentScreenshot];
}

updateScreenshot()
setInterval(updateScreenshot, 5000);