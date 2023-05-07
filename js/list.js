const reloadRates = {
	0: 'Disabled',
	5000: '5 seconds',
	20000: '20 seconds',
	60000: 'minute',
	180000: '3 minutes',
	300000: '5 minutes',
	600000: '10 minutes',
	1800000: '30 minutes',
};

const sortModes = [
	// default sort -- by least HP
	(a, b) => a.currentHp - b.currentHp,
	// no sorting (i.e. by newest)
	(a, b) => 1,
	// by biggest max damage
	(a, b) => b.maxDmg - a.maxDmg,
];

let currentInterval = 0;
let currentSortMode = 0;

function updateData() {
	const reloadSpinner = $$(document).find('#reloadSpinner');
	reloadSpinner.classList.value = 'spinner';
	const tableOverlay = $$(document).find('#tableOverlay');
	tableOverlay.classList.value = '';
	const lastUpdated = $$(document).find('#lastUpdated');
	lastUpdated.innerHTML = `Loading`;
	const url = `https://www.reddit.com/user/KickOpenTheDoorBot/submitted/.json?sort=new&_=${
		new Date().getTime()
	}`;
	loadBosses(url);
}

function loadBosses(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			updatePage(this.responseText);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function updatePage(json) {
	const reloadSpinner = $$(document).find('#reloadSpinner');
	reloadSpinner.classList.value = 'hidden';
	const tableOverlay = $$(document).find('#tableOverlay');
	tableOverlay.classList.add('hidden');
	setInitialLastUpdatedString();
	const bosses = getBossListFromListing(json);
	if (bosses.length < 1) return;
	bosses.sort(sortModes[currentSortMode]);
	const tbody = $$(document).find('#bossesTable');
	tbody.innerHTML = '';
	let totalDmg = 0;
	for (const boss of bosses) {
		const tr = document.createElement('div');
		tr.classList.add('tr');
		const linkRow = document.createElement('div');
		linkRow.classList.add('bossLink');
		const dataRow = document.createElement('div');
		dataRow.classList.add('bossData');
		linkRow.innerHTML = `<img class="thing smallthumb" alt="Post Thumbnail" src="${
			boss.thumbnail
		}"><a class="bossLink" href="${
			`https://www.reddit.com/r/kickopenthedoor/comments/${boss.id}`
		}" target="_blank">${
			boss.title.replace(/(.*?)\s+\[.*?\]$/, '$1')
		}</a><span class="flex-grow"></span><a class="thing refresherLink" title="Watch this boss" href="../refresher/index.html?id=${
			boss.id
		}">&#x1F440;</a>`;

		dataRow.innerHTML = `<div class="td flex-fill">
		<span class="thing flair" style="background-color:${
			boss.flair.backgroundColor
		}; color: ${
			boss.flair.textColor === "light" ? "white" : "black"
		}">${
			boss.flair.text
		}</span></div><div class="td"><span title="Approx. Max Gold">&#x1F4B0;</span> ${
			getMaxGold(boss)
		}</div><div class="td"><span title="Max Damage">&#x1F4A5;<span> ${
			boss.maxDmg
		}</div>`;
		tr.appendChild(linkRow);
		tr.appendChild(dataRow);
		tbody.appendChild(tr);
		totalDmg += Number(boss.maxDmg);
	}
	const lastRow = document.createElement('div');
	lastRow.classList.add('tr');
	lastRow.innerHTML = `<div class="totalDmg">
		<span class="thing td rightalign">Total Max Damage:</span>
		<span class="thing td" title="Total Max Damage">&#x1F4A5; ${
			totalDmg
		}</span></div>`;
	tbody.appendChild(lastRow);
}

function getBossListFromListing(json) {
	const searchData = JSON.parse(json).data;
	const bosses = [];

	for (const post of searchData.children.filter(c => c.kind === "t3")) {
		if (post.data.locked || post.data.title.startsWith("[Slime Only] ")) continue;
		const flair = post.data.link_flair_text;
		const flairData = parseFlair(flair);
		const maxDmg = getMaxDmg({
			maxHp: flairData.maxHp,
			currentHp: flairData.currentHp,
			stars: flairData.stars
		});

		if (flairData.currentHp > 0) {
			bosses.push({
				id: post.data.id,
				title: post.data.title,
				flair: {
					text: post.data.link_flair_text,
					textColor: post.data.link_flair_text_color,
					backgroundColor: post.data.link_flair_background_color
				},
				thumbnail: post.data.thumbnail,
				type: flairData.type,
				stars: flairData.stars,
				currentHp: flairData.currentHp,
				maxHp: flairData.maxHp,
				maxDmg: maxDmg
			});
		}
	}

	return bosses;
}

function parseFlair(flair) {
	if (flair.includes("/u/")) {
		return {
			type: null,
			stars: null,
			currentHp: 0,
			maxHp: null
		};
	}
	return {
		type: flair.replace(/([^ ]+).*/, '$1'),
		stars: flair.includes('Boss') ?
				flair.replace(/(.*?) .*/, '$1') :
				flair.replace(/.*? (.*?) .*/, '$1'),
		currentHp: flair.replace(/.*? \[.*? (\d+).*/, '$1'),
		maxHp: flair.replace(/.*?\/(\d+).*/, '$1')
	};
}

function getMaxGold(boss) {
	// (0.086 * BossMaxHealth ^ 0.547 * (BossMaxHealth - BossCurrentHealth) ^0.263 + 10) * BossLevel ^ 0.167
	return `${Math.floor(
		(0.086 * boss.maxHp**0.547 * (boss.maxHp - boss.currentHp)**0.263 + 10) * boss.stars.length**0.167
	)}`;
}

function getMaxDmg(boss) {
	// MaxDamage = 0.08 * MaxHealth^0.15 * CurrentHealth^0.5 * BossLevel^1.7
	return `${Math.ceil(0.08 * boss.maxHp**0.15 * boss.currentHp**0.5 * boss.stars.length**1.7)}`;
}

function upholdReloadRate(interval) {
	if (interval <= 1) return;
	const lastUpdated = $$(document).find("#lastUpdated");
	if (!!lastUpdated.data) {
		const delta = Date.now() - lastUpdated.data;
		if (delta >= interval) {
			updateData();
		}
	}
}

function windTheClock() {
	const now = new Date();
	onEverySecond();

	const nowMillis = now.getMilliseconds();
	let timeout = 1000;
	if (nowMillis > 100) timeout = (1000 + nowMillis) / 2;
	setTimeout(windTheClock, timeout);
}

function onEverySecond() {
	updateLastUpdatedString();
	upholdReloadRate(currentInterval);
}

function onReloadRateChange(newValue) {
	currentInterval = newValue;
}

function onSortModeChange(newValue) {
	currentSortMode = newValue;
	updateData();
}

window.addEventListener("load", function (e) {
	document.addEventListener("keypress", function (e) {
		if (e.key === "r") {
			updateData();
		}
	});
	$$(document).find('#reloadLink').addEventListener("click", function (e) {
		e.preventDefault();
		updateData();
	});
	$$(document).find('#sortMode').addEventListener("change", function (e) {
		onSortModeChange(e.target.value);
	});
	const reloadRatesDiv = $$(document).find('#reloadRate');
	reloadRatesDiv.innerHTML = getReloadRatesHTML(reloadRates);
	reloadRatesDiv.addEventListener("change", function(e) {
		onReloadRateChange(e.target.value);
	});
	windTheClock();
	updateData();
});
