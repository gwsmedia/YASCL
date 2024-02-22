import Options from '../Helper/Options';
import DragHelper from '../Helper/DragHelper';
import ParseUtils from '../Utils/ParseUtils';
import SpatialUtils from '../Utils/SpatialUtils';


export default class Carousel {
	static get DIRECTION_FORWARDS() { return 0; }
	static get DIRECTION_BACKWARDS() { return 1; }
	static get DIRECTION_UNKNOWN() { return 2; }

	static get STATE_PRE_ANIMATION() { return 0; }
	static get STATE_POST_ANIMATION() { return 1; }

	static get CLASS_PARENT() { return "yascl"; }
	static get CLASS_WRAPPER() { return "yascl-wrapper"; }
	static get CLASS_PROCESSING() { return "processing"; }
	static get CLASS_ANIMATING() { return "animating"; }
	static get CLASS_VERTICAL() { return "vertical"; }
	static get CLASS_AUTOPLAY() { return "autoplay"; }
	static get CLASS_PREV_ARROW() { return "prev"; }


	constructor(parent, options) {
		this.parent = parent;
		this.options = new Options(options);

		if(this.options.skipDomReady) {
			this.initialise();
		} else {
			jQuery(window).on('load', () => {
				this.initialise();
			});
		}
	}


	initialise() {
		if(this.parent.length === 0 || this.parent.hasClass(Carousel.CLASS_PARENT)) {
			// Do not initialise if parent element cannot be found or has already been initialised.
			return;
		}

		this.wrapChildren();

		if(this.options.vertical) {
			this.startSide = SpatialUtils.SIDE_TOP;
			this.endSide = SpatialUtils.SIDE_BOTTOM;
			this.wrapper.addClass(Carousel.CLASS_VERTICAL);
		} else {
			this.startSide = SpatialUtils.SIDE_LEFT;
			this.endSide = SpatialUtils.SIDE_RIGHT;
		}

		let startPos;

		if(this.options.reverse) {
			this.currentIndex = this.items.length - 1;
			this.currentSlide = this.items.last()

			const innerSize = SpatialUtils.getSize(this.inner, this.options.vertical, false, false);
			const wrapperSize = SpatialUtils.getSize(this.wrapper, this.options.vertical, true, true);

			startPos = wrapperSize - innerSize;
		} else {
			this.currentIndex = 0;
			this.currentSlide = this.items.first();

			startPos = '0px'
		}

		this.wrapper.css(this.endSide, startPos);

		if(this.options.arrowSelector) {
			this.prepareArrows();
			this.setArrowEvents();
		}

		this.updateArrowVisibility();

		if(this.options.draggable) {
			// TODO: Kinda gross passing funcs as params like this. Refactor.
			this.dragHelper = new DragHelper(this.wrapper, this.inner, this.options.vertical, () => { return this.getCurrentPos() }, () => { this.updateArrowVisibility(); }, () => { this.cancelSliding() });
			this.dragHelper.addEvents();
		}

		if(this.options.autoplay) {
			this.wrapper.addClass(Carousel.CLASS_AUTOPLAY);
			this.slide(this.options.reverse ? Carousel.DIRECTION_FORWARDS : Carousel.DIRECTION_BACKWARDS, this.options.delay);
		}
	}


	// TODO: slideToEdge + loop + move right issue
	// Wrap all slider items in slider wrapper
	wrapChildren() {
		this.parent.addClass(Carousel.CLASS_PARENT);

		// Find inner wrapper if defined
		if(this.options.innerSelector) this.inner = this.parent.find(this.options.innerSelector);

		// If it counldn't be found, the parent and inner wrapper are the same
		if(this.inner == null || this.inner.length === 0) this.inner = this.parent;

		// Wrap children with wrapper class
		this.inner.children().wrapAll('<div class="' + Carousel.CLASS_WRAPPER + '"></div>');

		// Get new wrapper as object
		this.wrapper = this.inner.children('.' + Carousel.CLASS_WRAPPER);

		this.items = this.wrapper.children();
	}


	// Entry point for slider movement
	slide(direction, delay = 0, slideNum = null) {
		setTimeout(() => {
			// If slider is already moving, ignore trigger
			if (this.wrapper.hasClass(Carousel.CLASS_ANIMATING)) return;
			this.wrapper.addClass(Carousel.CLASS_ANIMATING);

			// Prepare looped item if moving right and prior to animation
			if(this.options.loop) this.moveLoopedItem(direction, Carousel.STATE_PRE_ANIMATION);

			const movementData = this.getMovementData(direction, slideNum);

			// Get new position value
			// TODO: use transform instead of position
			const end = this.getCurrentPos() + movementData.distance
			this.wrapper.animate({ [this.endSide]: end }, this.options.time, this.options.easing, () => {
				this.wrapper.removeClass(Carousel.CLASS_ANIMATING);

				// TODO: need to trigger update after dragging
				this.currentIndex = movementData.targetIndex;
				this.currentSlide = movementData.targetItem;

				if(this.options.loop) this.moveLoopedItem(direction, Carousel.STATE_POST_ANIMATION);

				this.updateArrowVisibility();

				const boundaryCrossed = this.boundaryCrossed(direction == Carousel.DIRECTION_FORWARDS ? this.startSide : this.endSide);

				if ((this.options.loop || boundaryCrossed) && this.wrapper.hasClass(Carousel.CLASS_AUTOPLAY)) {
					this.slide(direction, this.options.delay);
				}
			});
		}, delay);
	}


	slideNext() {
		this.cancelSliding();
		this.slide(Carousel.DIRECTION_BACKWARDS);
	}


	slidePrev() {
		this.cancelSliding();
		this.slide(Carousel.DIRECTION_FORWARDS);
	}


	slideTo(slideNum) {
		if(slideNum < 0 || slideNum > this.wrapper.children().length) return;
		this.cancelSliding();
		this.slide(Carousel.DIRECTION_UNKNOWN, 0, slideNum);
	}


	cancelSliding() {
		this.wrapper.removeClass(Carousel.CLASS_AUTOPLAY + ' ' + Carousel.CLASS_ANIMATING);
	}


	getCurrentSlide() {
		return this.currentSlide;
	}


	getCurrentIndex() {
		return this.currentIndex;
	}


	getNextSlide() {
		return this.getAdjancentSlide(false);
	}


	getPrevSlide() {
		return this.getAdjancentSlide(true);
	}


	getAdjancentSlide(prev = false) {
		let index = prev ? this.currentIndex - 1 : this.currentIndex + 1;
		let slide = this.items.eq(index);
		if(slide.length === 0) {
			return this.options.loop ? (prev ? this.items.last() : this.items.first()) : null;
		} else return slide;
	}


	getCurrentPos() {
		return ParseUtils.pixelsToInt(this.wrapper.css(this.endSide));
	}


	getMovementData(direction, slideNum = null) {
		// TODO: Refactor different wrappers to different classes?
		const innerStart = SpatialUtils.getSidePos(this.inner, this.startSide, false);

		let i, item, start, end, operand, distance = 0;
		let items = this.wrapper.children();

		if(slideNum != null) start = slideNum, end = slideNum + 1, operand = 1;
		else if (direction === Carousel.DIRECTION_BACKWARDS) start = 0, end = items.length, operand = 1;
		else start = items.length - 1, end = 0, operand = -1;

		for(i = start; slideNum != null || direction === Carousel.DIRECTION_BACKWARDS ? i < end : i >= end; i += operand) {
			item = jQuery(items[i]);
			const itemStart = SpatialUtils.getSidePos(item, this.startSide, true, true);

			// if direction BACKWARDS or UNKNOWN
			if(direction !== Carousel.DIRECTION_FORWARDS && itemStart > innerStart) {
				distance = itemStart - innerStart;
				if(direction === Carousel.DIRECTION_UNKNOWN) direction = Carousel.DIRECTION_BACKWARDS;
				break;
			// if direction FORWARDS or UNKNOWN
			} else if(direction !== Carousel.DIRECTION_BACKWARDS) {
				const innerEnd = SpatialUtils.getSidePos(this.inner, this.endSide, false, false, innerStart)
				const itemEnd = SpatialUtils.getSidePos(item, this.endSide, true, true, itemStart)

				if(this.options.slideToEdge && itemEnd < innerEnd) {

					distance = itemEnd - innerEnd;
					if(direction === Carousel.DIRECTION_UNKNOWN) direction = Carousel.DIRECTION_FORWARDS;
					break;

				} else if(!this.options.slideToEdge && itemStart < innerStart) {

					distance = itemStart - innerStart;
					if(direction === Carousel.DIRECTION_UNKNOWN) direction = Carousel.DIRECTION_FORWARDS;
					break;

				}
			}

			if(slideNum != null) break;
		}

		const overstep = this.getBoundaryOverstep(direction === Carousel.DIRECTION_FORWARDS ? this.startSide : this.endSide);
		if(Math.abs(distance) > Math.abs(overstep)) distance = overstep;

		return {targetIndex: i, targetItem: item, distance: distance};
	}


	// Move items to continue loop
	moveLoopedItem(direction, state) {
		const eq = direction === Carousel.DIRECTION_BACKWARDS ? 0 : -1;
		const items = this.wrapper.children();
		// Get first or last item in set depending on direction
		const item = items.eq(eq);

		if (direction === Carousel.DIRECTION_BACKWARDS && state === Carousel.STATE_POST_ANIMATION) {
			// Move first item to end
			item.appendTo(this.wrapper);
			// Reset translation (would be offset otherwise,
			// due to the first item moving to the end)
			this.wrapper.css(this.endSide, "0px");
		} else if (direction === Carousel.DIRECTION_FORWARDS && state === Carousel.STATE_PRE_ANIMATION) {
			// Move last item to start
			item.prependTo(this.wrapper);
			// Get full size of item including margins
			const size = SpatialUtils.getSize(item, this.options.vertical, true, true);
			// Set translation to size of item ready to move into slider
			this.wrapper.css(this.endSide, size);
		}
	}


	prepareArrows() {
		if(this.options.localArrows) {
			// If localArrows is true, search for arrows in parent element
			this.arrows = this.parent.find(this.options.arrowSelector);
		} else {
			// Else search DOM for arrows
			this.arrows = jQuery(this.options.arrowSelector);
		}
	}


	// Set click events for navigation arrows
	setArrowEvents() {
		// Add click events to each arrow
		this.arrows.click((e) => {
			let direction;

			// DEPRECATION START
			// Legacy class check
			let legacyArrow = this.arrows.filter(".right");
			if(legacyArrow.length > 0) {

				direction = jQuery(e.currentTarget).hasClass("right") ? Carousel.DIRECTION_BACKWARDS : Carousel.DIRECTION_FORWARDS;

			} else {
				// DEPRECATION END

				// Assume next arrow unless has prev arrow class
				direction = jQuery(e.currentTarget).hasClass(Carousel.CLASS_PREV_ARROW) ? Carousel.DIRECTION_FORWARDS : Carousel.DIRECTION_BACKWARDS;

				// DEPRECATION START
			}
			// DEPRECATION END

			// If arrow clicked it should stop autoplay
			this.wrapper.removeClass(Carousel.CLASS_AUTOPLAY);
			// Trigger animation
			this.slide(direction);
		});
	}


	getBoundaryOverstep(boundary, asBool = false) {
		const items = this.wrapper.children();
		const slide = boundary == this.startSide ? items.first() : items.last();

		const innerStart = SpatialUtils.getSidePos(this.inner, this.startSide, false);
		const slideStart = SpatialUtils.getSidePos(slide, this.startSide, true, true)

		if(boundary == this.startSide) {

			return asBool ? slideStart < innerStart : slideStart - innerStart;

		} else if(boundary == this.endSide) {

			const innerEnd = SpatialUtils.getSidePos(this.inner, this.endSide, false, false, innerStart)
			const slideEnd = SpatialUtils.getSidePos(slide, this.endSide, true, true, slideStart)

			return asBool ? slideEnd > innerEnd : slideEnd - innerEnd;

		}
	}


	boundaryCrossed(boundary) {
		return this.getBoundaryOverstep(boundary, true);
	}


	updateArrowVisibility() {
		this.toggleArrow(this.startSide, this.options.loop || this.boundaryCrossed(this.startSide));
		this.toggleArrow(this.endSide, this.options.loop || this.boundaryCrossed(this.endSide));
	}


	// Show / hide arrow
	toggleArrow(side, state = true) {
		if(this.arrows == null) return;

		let arrowEl;

		// DEPRECATION START
		// If legacy arrow class found, use that instead -- to be removed
		let legacyArrow = this.arrows.filter(".right");
		if(legacyArrow.length > 0) {
			if(side == this.startSide) {
				arrowEl = this.arrows.not(".right");
			} else {
				arrowEl = legacyArrow;
			}

			arrowEl.toggle(state);
			return;
		}
		// DEPRECATION END

		if(side == this.startSide) {
			arrowEl = this.arrows.filter("." + Carousel.CLASS_PREV_ARROW);
		} else {
			arrowEl = this.arrows.not("." + Carousel.CLASS_PREV_ARROW);
		}

		arrowEl.toggle(state);
	}
}
