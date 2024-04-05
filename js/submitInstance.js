const resultEl = document.getElementById("result")
const captchaIdEl = document.getElementById("captchaId")
const captchaImgEl = document.getElementById("captchaImg")
const captchaAnswerEl = document.getElementById("captchaAnswer")
const apiRoot = "https://lighttube.kuylar.dev";

document.getElementById("form").addEventListener('submit', submitInstance);

function submitInstance(event) {
	event.preventDefault();
	document.getElementById("submit").disabled = true;
	const form = new FormData(event.target);
	const json = {
		"url": form.get("url"),
		"authorEmail": form.get("authorEmail"),
		"country": form.get("country"),
		"isCloudflare": form.get("isCloudflare") === "on",
		"captchaId": form.get("captchaId"),
		"captchaAnswer": form.get("captchaAnswer")
	}
	console.log();
	fetch(apiRoot + "/put/instance", {
		method: "PUT",
		body: JSON.stringify(json),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(x => x.text())
		.then(x => {
			document.getElementById("submit").disabled = false;
			resultEl.style.display = "block";
			resultEl.innerText = x;
			reloadCaptcha();
		})
		.catch();
}

function reloadCaptcha() {
	fetch(apiRoot + "/getChallenge")
		.then(x => x.json())
		.then(x => {
			captchaImgEl.src = "data:image/png;base64," + x.image;
			captchaIdEl.value = x.id;
			captchaAnswerEl.value = "";
		})
		.catch(console.error)
}

reloadCaptcha();