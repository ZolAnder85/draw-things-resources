const response = await fetch("../templates.html");
const body = await response.text();
document.body.innerHTML = body + document.body.innerHTML;

while (true) {
	const instance = document.getElementsByTagName("instance")[0];
	if (instance == undefined) {
		break;
	}
	const template = document.getElementById(instance.getAttribute("template"));
	if (template) {
		let resultHTML = template.innerHTML;
		for (const attribute of instance.attributes) {
			resultHTML = resultHTML.replaceAll("{" + attribute.nodeName + "}", attribute.nodeValue);
		}
		instance.outerHTML = resultHTML;
	} else {
		instance.remove();
	}
}

const groups = document.querySelectorAll("[collapsible]");
for (const group of groups) {
	const storageKey = group.id + "-collapsed";
	const storedState = localStorage.getItem(storageKey);
	if (storedState == "true") {
		group.classList.add("collapsed")
	} else if (storedState == "false") {
		group.classList.remove("collapsed")
	}
	group.firstElementChild.addEventListener("click", event => {
		if (group.classList.contains("collapsed")) {
			group.classList.remove("collapsed")
			localStorage.setItem(storageKey, "false")
		} else {
			group.classList.add("collapsed")
			localStorage.setItem(storageKey, "true")
		}
		event.stopPropagation();
	});
}

const rows = document.querySelectorAll("[combined]");
for (const row of rows) {
	const slider = row.children[1];
	const numeric = row.children[2];
	slider.addEventListener("input", event => {
		numeric.value = slider.value;
	});
	numeric.addEventListener("input", event => {
		slider.value = numeric.value;
	});
}