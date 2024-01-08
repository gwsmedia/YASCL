import './yascl.css';
import jQuery from 'jquery';
import Options from './Helper/Options';
import DragHelper from './Helper/DragHelper';
import ParseUtils from './Utils/ParseUtils';
import PositionUtils from './Utils/PositionUtils';


export default class YASCL {
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

	constructor(options) {
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
		this.parent = jQuery(this.options.selector);

		if(this.parent.length === 0 || this.parent.hasClass(YASCL.CLASS_PARENT)) {
			// Do not initialise if parent element cannot be found or has already been initialised.
			return;
		} else if(this.parent.length > 1) {
			this.initialiseMultiple();
		} else {
			this.initialiseSingle();
		}
	}


	initialiseMultiple() {
		let options = this.options.getAll();
		options.selector += '.' + YASCL.CLASS_PROCESSING;
		options.skipDomReady = true;

		// Initialise each slider
		this.parent.each(function() {
			jQuery(this).addClass(YASCL.CLASS_PROCESSING);
			new YASCL(options);
			jQuery(this).removeClass(YASCL.CLASS_PROCESSING);
		});
	}


	initialiseSingle() {
		this.wrapChildren();

		if(this.options.vertical) {
			this.startSide = PositionUtils.SIDE_TOP;
			this.endSide = PositionUtils.SIDE_BOTTOM;
			this.wrapper.addClass(YASCL.CLASS_VERTICAL);
		} else {
			this.startSide = PositionUtils.SIDE_LEFT;
			this.endSide = PositionUtils.SIDE_RIGHT;
		}

		// TODO: use transform instead of position
		const innerSize = this.options.vertical ? this.inner.height() : this.inner.width();
		const wrapperSize = this.options.vertical ? this.wrapper.outerHeight(true) : this.wrapper.outerWidth(true);
		this.wrapper.css(this.endSide, this.options.reverse ? wrapperSize - innerSize : '0px');

		if(this.options.arrowSelector) {
			this.prepareArrows();
			this.setArrowEvents();
		}

		this.updateArrowVisibility();

		if(this.options.draggable) {
			// TODO: Kinda gross passing funcs as params like this. Refactor.
			this.dragHelper = new DragHelper(this.wrapper, this.inner, this.options.vertical, () => { return this.getCurrentPos() }, () => { this.updateArrowVisibility(); });
			this.dragHelper.addEvents();
		}

		if(this.options.autoplay) {
			this.wrapper.addClass(YASCL.CLASS_AUTOPLAY);
			this.slide(this.options.reverse ? YASCL.DIRECTION_FORWARDS : YASCL.DIRECTION_BACKWARDS);
		}
	}


	// TODO: slideToEdge + loop + move right issue
	// Wrap all slider items in slider wrapper
	wrapChildren() {
		this.parent.addClass(YASCL.CLASS_PARENT);

		// Find inner wrapper if defined
		if(this.options.innerSelector) this.inner = this.parent.find(this.options.innerSelector);

		// If it counldn't be found, the parent and inner wrapper are the same
		if(this.inner == null || this.inner.length === 0) this.inner = this.parent;

		// Wrap children with wrapper class
		this.inner.children().wrapAll('<div class="' + YASCL.CLASS_WRAPPER + '"></div>');

		// Get new wrapper as object
		this.wrapper = this.inner.children('.' + YASCL.CLASS_WRAPPER);
	}


	// Entry point for slider movement
	slide(direction, slideNum = null) {
		// If slider is already moving, ignore trigger
		if (this.wrapper.hasClass(YASCL.CLASS_ANIMATING)) return;
		this.wrapper.addClass(YASCL.CLASS_ANIMATING);

		// Prepare looped item if moving right and prior to animation
		if(this.options.loop) this.moveLoopedItem(direction, YASCL.STATE_PRE_ANIMATION);

		// Get new position value
		const end = this.getCurrentPos() + this.getMovementDistance(direction, slideNum);

		this.wrapper.animate({ [this.endSide]: end }, this.options.time, this.options.easing, () => {
			if(this.wrapper.find(":animated").length > 0) return;
			this.wrapper.removeClass(YASCL.CLASS_ANIMATING);

			if(this.options.loop) this.moveLoopedItem(direction, YASCL.STATE_POST_ANIMATION);

			this.updateArrowVisibility();

			const boundaryCrossed = this.boundaryCrossed(direction == YASCL.DIRECTION_FORWARDS ? this.startSide : this.endSide);

			// TODO: add autoplay delay option
			if ((this.options.loop || boundaryCrossed) && this.wrapper.hasClass(YASCL.CLASS_AUTOPLAY)) {
				this.slide(direction);
			}
		});
	}


	slideTo(slideNum) {
		if(slideNum < 0 || slideNum > this.wrapper.children().length) return;
		this.wrapper.removeClass(YASCL.CLASS_AUTOPLAY + ' ' + YASCL.CLASS_ANIMATING);
		this.slide(YASCL.DIRECTION_UNKNOWN, slideNum);
	}


	getCurrentPos() {
		return ParseUtils.pixelsToInt(this.wrapper.css(this.endSide));
	}


	getMovementDistance(direction, slideNum = null) {
		// TODO: Refactor different wrappers to different classes?
		const innerStart = PositionUtils.getSidePos(this.inner, this.startSide, false);

		let start, end, operand, distance = 0;
		let items = this.wrapper.children();

		if(slideNum != null) start = slideNum, end = slideNum + 1, operand = 1;
		else if (direction === YASCL.DIRECTION_BACKWARDS) start = 0, end = items.length, operand = 1;
		else start = items.length - 1, end = 0, operand = -1;

		for(let i = start; slideNum != null || direction === YASCL.DIRECTION_BACKWARDS ? i < end : i >= end; i += operand) {
			const item = jQuery(items[i]);
			const itemStart = PositionUtils.getSidePos(item, this.startSide, true, true);

			// if direction BACKWARDS or UNKNOWN
			if(direction !== YASCL.DIRECTION_FORWARDS && itemStart > innerStart) {
				distance = itemStart - innerStart;
				if(direction === YASCL.DIRECTION_UNKNOWN) direction = YASCL.DIRECTION_BACKWARDS;
				break;
			}

			// if direction FORWARDS or UNKNOWN
			// Not using else intentionally - we want this to run if DIRECTION_UNKNOWN didn't reach break above
			if(direction !== YASCL.DIRECTION_BACKWARDS) {
				const innerEnd = PositionUtils.getSidePos(this.inner, this.endSide, false, false, innerStart)
				const itemEnd = PositionUtils.getSidePos(item, this.endSide, true, true, itemStart)

				if(this.options.slideToEdge && itemEnd < innerEnd) {

					distance = itemEnd - innerEnd;
					if(direction === YASCL.DIRECTION_UNKNOWN) direction = YASCL.DIRECTION_FORWARDS;
					break;

				} else if(!this.options.slideToEdge && itemStart < innerStart) {

					distance = itemStart - innerStart;
					if(direction === YASCL.DIRECTION_UNKNOWN) direction = YASCL.DIRECTION_FORWARDS;
					break;

				}
			}
		}

		const overstep = this.getBoundaryOverstep(direction === YASCL.DIRECTION_FORWARDS ? this.startSide : this.endSide);
		if(Math.abs(distance) > Math.abs(overstep)) distance = overstep;

		return distance;
	}


	// Move items to continue loop
	moveLoopedItem(direction, state) {
		const eq = direction === YASCL.DIRECTION_BACKWARDS ? 0 : -1;
		const items = this.wrapper.children();
		// Get first or last item in set depending on direction
		const item = items.eq(eq);

		if (direction === YASCL.DIRECTION_BACKWARDS && state === YASCL.STATE_POST_ANIMATION) {
			// Move first item to end
			item.appendTo(this.wrapper);
			// Reset translation (would be offset otherwise,
			// due to the first item moving to the end)
			this.wrapper.css(this.endSide, "0px");
		} else if (direction === YASCL.DIRECTION_FORWARDS && state === YASCL.STATE_PRE_ANIMATION) {
			// Move last item to start
			item.prependTo(this.wrapper);
			// Get full size of item including margins
			const size = this.options.vertical ? item.outerHeight(true) : item.outerWidth(true);
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

				direction = jQuery(e.currentTarget).hasClass("right") ? YASCL.DIRECTION_BACKWARDS : YASCL.DIRECTION_FORWARDS;

			} else {
				// DEPRECATION END

				// Assume next arrow unless has prev arrow class
				direction = jQuery(e.currentTarget).hasClass(YASCL.CLASS_PREV_ARROW) ? YASCL.DIRECTION_FORWARDS : YASCL.DIRECTION_BACKWARDS;

				// DEPRECATION START
			}
			// DEPRECATION END

			// If arrow clicked it should stop autoplay
			this.wrapper.removeClass(YASCL.CLASS_AUTOPLAY);
			// Trigger animation
			this.slide(direction);
		});
	}


	getBoundaryOverstep(boundary, asBool = false) {
		const items = this.wrapper.children();
		const slide = boundary == this.startSide ? items.first() : items.last();

		const innerStart = PositionUtils.getSidePos(this.inner, this.startSide, false);
		const slideStart = PositionUtils.getSidePos(slide, this.startSide, true, true)

		if(boundary == this.startSide) {

			return asBool ? slideStart < innerStart : slideStart - innerStart;

		} else if(boundary == this.endSide) {

			const innerEnd = PositionUtils.getSidePos(this.inner, this.endSide, false, false, innerStart)
			const slideEnd = PositionUtils.getSidePos(slide, this.endSide, true, true, slideStart)

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
			arrowEl = this.arrows.filter("." + YASCL.CLASS_PREV_ARROW);
		} else {
			arrowEl = this.arrows.not("." + YASCL.CLASS_PREV_ARROW);
		}

		arrowEl.toggle(state);
	}
}
