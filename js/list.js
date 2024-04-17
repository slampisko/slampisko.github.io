"use strict";

const page = new PageModel();
let excludedBosses = [];
let currentBosses = [];

const slimeToggleDivs = [{
		id: 'showSlimeDiv',
		clickableId: 'showSlime',
		html: `<span class="link" id="showSlime">Show</span> slime bosses`,
		clickHandler: () => {
			page.showSlimeBosses = true;
		}
	},
	{
		id: 'hideSlimeDiv',
		clickableId: 'hideSlime',
		html: `<span class="link" id="hideSlime">Hide</span> slime bosses`,
		clickHandler: () => {
			page.showSlimeBosses = false;
		}
	}
]

function updateData() {
	page.state = PageStates.LOADING;
	excludedBosses = [];
	const lastUpdated = $$(document).find('#lastUpdated');
	lastUpdated.innerHTML = `Loading`;
	const url = `https://www.reddit.com/user/KickOpenTheDoorBot/submitted/.json?sort=new&limit=50&_=${
		new Date().getTime()
	}`;
	loadBosses(url);
}

function loadBosses(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				updatePage(this.responseText);
			} else {
				updateError(this.responseText);
			}
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function toggleBossExcluded(boss_id) {
	const row = $$(document).find(`#boss_${boss_id}`);
	if (!!row) {
		if (excludedBosses.includes(boss_id)) {
			const index = excludedBosses.indexOf(boss_id);
			excludedBosses.splice(index, 1);
			row.classList.remove('excluded');
		} else {
			excludedBosses.push(boss_id);
			row.classList.add('excluded');
		}

		const totalDamageNumberSpan = $$(document).find(`span#totalDamageNumber`);
		const newMaxDamage = currentBosses.reduce((p, c) => {
			return (excludedBosses.includes(c.id)) ? p : p + Number(c.maxDmg);
		}, 0);
		totalDamageNumberSpan.textContent = newMaxDamage;
	}
}

function createBossRow(boss, tbody, totalDmg) {
	const tr = $$(`div#boss_${boss.id}.tr`);
	const linkRow = $$('div.bossLink');
	const dataRow = $$('div.bossData');
	linkRow.innerHTML = `<img class="thing smallthumb" alt="Post Thumbnail" src="${boss.thumbnail}"><a class="bossLink" href="${`https://www.reddit.com/r/kickopenthedoor/comments/${boss.id}`}" target="_blank">${
		// The second regex splits words longer than 32 characters into 32 characters long chunks
		boss.title.replace(/(.*?)\s+\[.*?\]$/, '$1').replaceAll(/(\S{31})(\S)/g, "$1\u200B$2")}</a><span class="flex-grow"></span><a class="thing refresherLink" title="Watch this boss" href="../refresher/index.html?id=${boss.id}">&#x1F440;</a>`;
	const thumb = $$(linkRow).find(`img`);
	thumb.addEventListener('click', function () {
		toggleBossExcluded(boss.id);
	});

	const [bg, fg] = getFlairColors(boss.flair.backgroundColor);
	dataRow.innerHTML = `<div class="td flex-fill">
		<span class="thing flair" style="background-color:${bg}; color:${fg}">${boss.flair.text}</span></div>
		<div class="td"><span title="Approx. Max Gold">&#x1F4B0;</span> ${getMaxGold(boss)}</div>
		<div class="td"><span title="Max Damage">&#x1F4A5;<span> ${boss.maxDmg}</div>`;
	tr.appendChild(linkRow);
	tr.appendChild(dataRow);
	tbody.appendChild(tr);
	totalDmg += Number(boss.maxDmg);
	return totalDmg;
}

function updatePage(json) {
	const bosses = getBossListFromListing(json);
	if (bosses.length < 1) return;
	bosses.sort(sortModes[page.sortMode]);
	const tbody = $$(document).find('#bossesTable');
	tbody.innerHTML = '';
	let totalDmg = 0;
	currentBosses = bosses;
	for (const boss of bosses) {
		totalDmg = createBossRow(boss, tbody, totalDmg);
	}
	const lastRow = new ElementBuilder('div.tr')
		.html(`<div class="totalDmg"><span class="thing td rightalign">Total Max Damage:</span>` +
			`<span class="thing td" title="Total Max Damage">&#x1F4A5; <span id="totalDamageNumber">${
				totalDmg
			}</span></span></div>`)
		.get();
	tbody.appendChild(lastRow);

	page.state = PageStates.LOADED;
}

function updateError(json) {
	page.state = PageStates.LOADED;
	const tbody = $$(document).find('#bossesTable');
	const response = JSON.parse(json);
	if (response.error == 429) {
		tbody.innerHTML = `<div class="tr"><span class="thing">&#x1F570;</span><span class="info">You are getting rate limited by reddit!</span>` +
			`<div class="tr"><span class='smaller'>Avoid refreshing over 100 times within 10 minutes to prevent this.` +
			`</span></div>`
		page.refreshInterval = 10000;
		const reloadRateSelect = $$(document).find('#reloadRate');
		if (reloadRateSelect.value < 10000) {
			reloadRateSelect.value = 10000;
		}
	} else {
		tbody.innerHTML = `<div class="tr"><span class="thing">&#x274C;</span><span class="info">Oof, that's an error!</span></div>` +
			`<div class="tr"><span class='smaller'>Error ${
					response.error
				}: ${
					response.message
				}</span></div>`;
	}
}

function getBossListFromListing(json) {
	const searchData = JSON.parse(json).data;
	const bosses = [];

	for (const post of searchData.children.filter(c => c.kind === "t3")) {
		if (post.data.locked || (!page.showSlimeBosses && post.data.title.startsWith("[Slime Only] "))) continue;
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
			flair.replace(/(.*?) .*/, '$1') : flair.replace(/.*? (.*?) .*/, '$1'),
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
	upholdReloadRate(page.refreshInterval);
}

function addSlimeToggle() {
	const domSlimeToggle = $$(document).find('div#slimeToggle');
	slimeToggleDivs.forEach(element => {
		const domElem = new ElementBuilder(`div#${element.id}.smaller.hidden`)
			.html(element.html)
			.get()
		const clickable = domElem.querySelector(`#${element.clickableId}`);
		clickable.addEventListener('click', element.clickHandler);
		domSlimeToggle.appendChild(domElem);
	});
}

function onStateChange(oldState, newState) {
	switch (newState) {
		case PageStates.LOADING:
			$$(document).hide('#showSlimeDiv');
			$$(document).hide('#hideSlimeDiv');
			$$(document).show('#reloadSpinner');
			$$(document).show('#tableOverlay');
			break;
		case PageStates.LOADED:
			if (page.showSlimeBosses) {
				$$(document).show('#hideSlimeDiv');
			} else {
				$$(document).show('#showSlimeDiv');
			}
			$$(document).hide('#reloadSpinner');
			$$(document).hide('#tableOverlay');
			setInitialLastUpdatedString();
		default:
			// noop
	}
}

/**
 * @param {PropertyChangedEvent} event The event that was raised
 */
function onPropertyChange(event) {
	if (['sortMode', 'showSlimeBosses'].includes(event.detail.property)) {
		updateData();
	} else if (event.detail.property === 'state') {
		onStateChange(event.detail.oldValue, event.detail.newValue);
	}
}

window.addEventListener("load", function (e) {
	document.addEventListener("keypress", function (e) {
		if (e.key === "r") {
			updateData();
		}
	});
	document.addEventListener('propertychange', onPropertyChange);
	$$(document).find('#reloadLink').addEventListener("click", function (e) {
		e.preventDefault();
		updateData();
	});
	$$(document).find('#sortMode').addEventListener("change", function (e) {
		page.sortMode = e.target.value;
	});
	const reloadRatesDiv = $$(document).find('#reloadRate');
	reloadRatesDiv.innerHTML = getReloadRatesHTML(reloadRates);
	reloadRatesDiv.addEventListener("change", function (e) {
		page.refreshInterval = e.target.value;
	});
	addSlimeToggle();
	windTheClock();
	updateData();
});