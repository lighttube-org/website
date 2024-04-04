function createInstanceElement(instance) {
	const tr = document.createElement("tr");

	const countryTd = document.createElement("td");
	countryTd.innerText = getFlagEmoji(instance.country) + " " + instance.country;
	if (instance.isCloudflare) {
		countryTd.innerHTML += " <span style='font-family: monospace'>⚠</span>";
		countryTd.title = "Proxied through CloudFlare"
		countryTd.style.textDecoration = "underline dotted";
	}
	tr.append(countryTd);

	const hostTd = document.createElement("td");
	const hostA = document.createElement("a");
	hostA.innerHTML = instance.host;
	hostA.setAttribute("href", instance.scheme + "://" + instance.host + "/");
	hostTd.append(hostA);
	tr.append(hostTd);

	const apiTd = document.createElement("td");
	apiTd.innerText = instance.apiEnabled ? "✅" : "❌";
	tr.append(apiTd);

	const accountsTd = document.createElement("td");
	accountsTd.innerText = instance.accountsEnabled ? "✅" : "❌";
	tr.append(accountsTd);

	const proxyTd = document.createElement("td");
	proxyTd.innerText = instance.proxyEnabled;
	tr.append(proxyTd);

	return tr;
}

function getFlagEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array
}

fetch("https://lighttube.kuylar.dev/instances")
	.then(x => x.json())
	.then(x => {
		shuffle(x).forEach(instance => {
			let element = createInstanceElement(instance);

			document.getElementById("tbody").append(element);
		});
		document.getElementById("placeholder").remove()
	})
	.catch(e => {
		document.getElementById("placeholder").innerText = e.toString();
	});