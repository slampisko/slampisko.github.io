const timestampThresholds = [
	{ limit: 5, text: 'Just now' },
	{ limit: 20, text: 'Seconds ago' },
	{ limit: 60, text: 'Less than a minute ago' },
	{ limit: 120, text: 'A minute ago' },
	{ limit: 3600, text: '{MIN} minutes ago' },
	{ limit: 7200, text: 'Over an hour ago' },
	{ limit: Infinity, text: 'Ages ago' }
];

// Solarized theme color definitions
// https://ethanschoonover.com/solarized/
const cBase03 = "#002b36";
const cBase02 = "#073642";
const cBase01 = "#586e75";
const cBase00 = "#657b83";
const cBase0 = "#839496";
const cBase1 = "#93a1a1";
const cBase2 = "#eee8d5";
const cBase3 = "#fdf6e3";
const cYellow = "#b58900";
const cOrange = "#cb4b16";
const cRed = "#dc322f";
const cMagenta = "#d33682";
const cViolet = "#6c71c4";
const cBlue = "#268bd2";
const cCyan = "#2aa198";
const cGreen = "#859900";

/**
 * Maps original flair color from the KOTD theme to modified background and foreground colors
 * to match the Solarized theme.
 */
const colorMap = {
	// Boss flairs from level 1 to 5
	"#197029": [cGreen, cBase3],
	"#ffd635": [cYellow, cBase3],
	"#f47601": [cOrange, cBase3],
	"#ff4500": [cMagenta, cBase3],
	"#ea0027": [cRed, cBase3],
	// Comment author flairs (race)
	"#bb99c4": [cViolet, cBase3], // Undead
	"#68ff00": [cGreen, cBase3], // Plant
	"#c02512": [cRed, cBase3], // Demon
	"#008282": [cCyan, cBase3], // Gnome
	"#d4c19e": [cBase2, cBase02], // Kobold
	"#e91e63": [cMagenta, cBase3], // Dragon
	"#373c3f": [cBase03, cBase3], // Troll
	"#888888": [cBase1, cBase3], // Slime
}

/**
 * Get background and foreground colors from the color map.
 * If no mapping exists, the original flair color is returned with a default foreground value.
 *
 * @param backgroundColor
 * @returns {string|(string|string)[]}
 */
function getFlairColors(backgroundColor) {
	return colorMap.hasOwnProperty(backgroundColor) ? colorMap[backgroundColor] : [backgroundColor, cBase3];
}

function getTimestampThresholdText(delta) {
	for (const threshold of timestampThresholds) {
		if (delta < threshold.limit * 1000) {
			return threshold.text.replace('{MIN}', ~~(delta / 60000));
		}
	}

	return 'Never';
}

function $$(element) {
	if (typeof element === 'string') {
		return new ElementBuilder(element).get();
	}

	return {
        find: function(selector) {
            return element.querySelector(selector);
        },
        findAll: function(selector) {
            return element.querySelectorAll(selector);
        },
		hide: function(selector) {
			element.querySelector(selector).classList.add('hidden');
		},
		show: function(selector) {
			element.querySelector(selector).classList.remove('hidden');
		}
    };
}

function getReloadRatesHTML(reloadRates) {
	let result = '';
	for (const key in reloadRates) {
		if (Object.hasOwnProperty.call(reloadRates, key)) {
			const element = reloadRates[key];
			result += `<option value="${key}">${element}</option>`;			
		}
	}

	return result;
}

function setInitialLastUpdatedString() {
    const updateTimestamp = new Date();
	const lastUpdated = $$(document).find('#lastUpdated');
	lastUpdated.title = `${updateTimestamp.toLocaleTimeString()}`;
	lastUpdated.data = updateTimestamp.getTime();
	lastUpdated.innerHTML = `Just now`;
	lastUpdated.classList.value = '';
}

function updateLastUpdatedString() {
	const lastUpdated = $$(document).find("#lastUpdated");
	if (!!lastUpdated.data) {
		const delta = Date.now() - lastUpdated.data;
		let textToSet = getTimestampThresholdText(delta);
		if (lastUpdated.innerHTML !== textToSet) {
			lastUpdated.innerHTML = textToSet;
		}
	}
}
