
import defaults from '../config/defaultOptions.js';

export default class Options {
	constructor(options) {
		this.options = {...defaults, ...options};

		Object.keys(this.options).forEach(key => {
			Object.defineProperty(this, key, {
				get: function() {
					return this.get(key);
				}
			});
		});
	}

	getAll() {
		return this.options;
	}

	get(key) {
		if(!this.options.hasOwnProperty(key)) return null;
		return this.options[key];
	}
}
