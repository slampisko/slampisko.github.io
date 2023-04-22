const timestampThresholds = [
	// { limit: Infinity, text: 'Never' }, // delete this
	{ limit: 5, text: 'Just now' },
	{ limit: 20, text: 'Seconds ago' },
	{ limit: 60, text: 'Less than a minute ago' },
	{ limit: 120, text: 'A minute ago' },
	{ limit: 3600, text: '{MIN} minutes ago' },
	{ limit: Infinity, text: 'Over an hour ago' }
];

const reloadRates = {
	0: 'Disabled',
	5: '5 seconds',
	20: '20 seconds',
	60: 'minute',
	180: '3 minutes',
	300: '5 minutes',
	600: '10 minutes',
	1800: '30 minutes',
};

let currentInterval = 0;

function updateData() {
	const reloadSpinner = $$(document).find('#reloadSpinner');
	reloadSpinner.classList.value = 'spinner';
	const tableOverlay = $$(document).find('#tableOverlay');
	tableOverlay.classList.value = '';
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
	reloadSpinner.classList.add('hidden');
	const tableOverlay = $$(document).find('#tableOverlay');
	tableOverlay.classList.add('hidden');
	const updateTimestamp = new Date();
	const lastUpdated = $$(document).find('#lastUpdated');
	lastUpdated.title = `${updateTimestamp.toLocaleTimeString()}`;
	lastUpdated.data = updateTimestamp.getTime();
	lastUpdated.innerHTML = `Just now`;
	const bosses = getBossListFromListing(json);
	if (bosses.length < 1) return;
	bosses.sort((a, b) => a.currentHp - b.currentHp);
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
		const maxDmg = getMaxDmg(boss);
		linkRow.innerHTML = `<img class="thing smallthumb" alt="Post Thumbnail" src="${
			boss.thumbnail
		}"><a href="${
			`https://www.reddit.com/r/kickopenthedoor/comments/${boss.id}`
		}" target="_blank">${
			boss.title.replace(/(.*?)\s+\[.*?\]$/, '$1')
		}</a>`;

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
			maxDmg
		}</div>`;
		tr.appendChild(linkRow);
		tr.appendChild(dataRow);
		tbody.appendChild(tr);
		totalDmg += Number(maxDmg);
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
				maxHp: flairData.maxHp
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
		stars: flair.replace(/.*? (.*?) .*/, '$1'),
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

function updateTimestamp() {
	const lastUpdated = $$(document).find("#lastUpdated");
	if (!!lastUpdated.data) {
		const delta = Date.now() - lastUpdated.data;
		let textToSet = getTimestampThresholdText(delta);
		if (lastUpdated.innerHTML !== textToSet) {
			lastUpdated.innerHTML = textToSet;
		}
	}
}

function getTimestampThresholdText(delta) {
	for (const threshold of timestampThresholds) {
		if (delta < threshold.limit * 1000) {
			return threshold.text.replace('{MIN}', ~~(delta / 60000));
		}
	}

	return 'Never';
}

function getReloadRatesHTML() {
	let result = '';
	for (const key in reloadRates) {
		if (Object.hasOwnProperty.call(reloadRates, key)) {
			const element = reloadRates[key];
			result += `<option value="${key}000">${element}</option>`;			
		}
	}

	return result;
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
	updateTimestamp();
	upholdReloadRate(currentInterval);
}

function onReloadRateChange(newValue) {
	currentInterval = newValue;
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
	const reloadRates = $$(document).find('#reloadRate')
	reloadRates.innerHTML = getReloadRatesHTML();
	reloadRates.addEventListener("change", function(e) {
		onReloadRateChange(e.target.value);
	});
	windTheClock();
	updateData();
});
