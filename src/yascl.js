import './yascl.css';
import jQuery from 'jquery';
import Carousel from './Core/Carousel';


export default class YASCL {
	constructor(options) {
		let carousels = [];

		if(!options.selector || typeof options.selector !== 'string') {
			console.error('A valid CSS selector is required to initialise the carousel.');
			return null;
		}

		jQuery(options.selector).each(function() {
			carousels.push(new Carousel(jQuery(this), options));
		});

		this.carousels = carousels;

		return new Proxy(this, {
			get(target, prop, receiver) {
				return function(...args) {
					if(target[prop] instanceof Function) {
						return Reflect.apply(target[prop], target, args);
					}

					let returnVals = [];

					for(let i = 0, j = target.carousels.length; i < j; i++) {
						let carousel = target.carousels[i];

						if(carousel[prop] instanceof Function) {
							let val = Reflect.apply(carousel[prop], carousel, args);
							returnVals.push(val);
						}
					}

					return returnVals;
				}
			}
		});
	}

	getCarousels() {
		return this.carousels;
	}

	getCarousel(i) {
		return this.carousels[i];
	}

	carouselCount() {
		return this.carousels.length;
	}
}
