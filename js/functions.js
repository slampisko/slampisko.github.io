const timestampThresholds = [
	{ limit: 5, text: 'Just now' },
	{ limit: 20, text: 'Seconds ago' },
	{ limit: 60, text: 'Less than a minute ago' },
	{ limit: 120, text: 'A minute ago' },
	{ limit: 3600, text: '{MIN} minutes ago' },
	{ limit: 7200, text: 'Over an hour ago' },
	{ limit: Infinity, text: 'Ages ago' }
];

function getTimestampThresholdText(delta) {
	for (const threshold of timestampThresholds) {
		if (delta < threshold.limit * 1000) {
			return threshold.text.replace('{MIN}', ~~(delta / 60000));
		}
	}

	return 'Never';
}

function $$(element) {
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
