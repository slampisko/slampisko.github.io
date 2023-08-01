"use strict";

class ElementBuilder {
    /**
     * @param {string} element The element to create
     */
    constructor(element) {
        const matches = element.split(/(\w+)(?:#(\w+))?((?:\.\w+)*)/g);
        if (matches.length <= 1 || matches[0] !== '') {
            throw new SyntaxError('You must provide a valid element string!');
        }
        this._element = document.createElement(matches[1]);
        if (!!matches[2]) {
            this._element.id = matches[2];
        }
        if (!!matches[3]) {
            this.classes(matches[3].split('.'));
        }
    }

    /**
     * @param {string} id
     */
    id(id) {
        this._element.id = id;
        return this;
    }

    /**
     * @param {string[]} classes
     */
    classes(classes) {
        this._element.classList = classes.filter(c => c !== '').join(' ');
        return this;
    }

    /**
     * @param {string} html
     */
    html(html) {
        this._element.innerHTML = html;
        return this;
    }

    /**
     * @returns {HTMLElement} The created element
     */
    get() {
        return this._element;
    }
}

const PageStates = {
	INIT: 0,
	LOADING: 1,
	LOADED: 2
};

const reloadRates = {
	0: 'Disabled',
	6250: '6.25 seconds',
	10000: '10 seconds',
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

class PropertyChangedEvent extends CustomEvent {
	/**
	 * @param {string} propertyName Name of the property that has changed
	 */
	constructor(propertyName, oldValue, newValue) {
		super('propertychange', {
			detail: {
				property: propertyName,
                oldValue: oldValue,
                newValue: newValue
			}
		});
	}
}

class PageModel {
	constructor() {
        this._state = PageStates.INIT;
		this._refreshInterval = 0;
		this._sortMode = 0;
		this._showSlimeBosses = false;
	}

	get state() {
		return this._state;
	}

	/**
	 * @param {PageStates} value The state to set
	 */
	set state(value) {
        let oldValue = this._state;
		this._state = value;
		document.dispatchEvent(new PropertyChangedEvent('state', oldValue, value));
	}

	get refreshInterval() {
		return this._refreshInterval;
	}

	/**
	 * @param {Number} value The refresh interval to set
	 */
	set refreshInterval(value) {
        let oldValue = this._refreshInterval;
		this._refreshInterval = value;
		document.dispatchEvent(new PropertyChangedEvent('interval', oldValue, value));
	}

	get sortMode() {
		return this._sortMode;
	}

	/**
	 * @param {function} value The sort mode to set
	 */
	set sortMode(value) {
        let oldValue = this._sortMode;
		this._sortMode = value;
		document.dispatchEvent(new PropertyChangedEvent('sortMode', oldValue, value));
	}

	get showSlimeBosses() {
		return this._showSlimeBosses;
	}

	/**
	 * @param {boolean} value Whether to show slime bosses or not
	 */
	set showSlimeBosses(value) {
        let oldValue = this._showSlimeBosses;
		this._showSlimeBosses = value;
		document.dispatchEvent(new PropertyChangedEvent('showSlimeBosses', oldValue, value));
	}
}
