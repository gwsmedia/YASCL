import './yascl.css';
import jQuery from 'jquery';
import DragHelper from './Helper/DragHelper';
import ParseUtils from './Utils/ParseUtils';


export default class YASCL {
	static get DIRECTION_FORWARDS() { return 0; }
	static get DIRECTION_BACKWARDS() { return 1; }

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
		this.options = options;

		if(this.options.skipDomReady != null && this.options.skipDomReady) {
			this.initialise();
		} else {
			jQuery(() => {
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
		let options = this.options;
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

		if(this.options.vertical != null && this.options.vertical) {
			this.startSide = 'top';
			this.endSide = 'bottom';
			this.wrapper.addClass(YASCL.CLASS_VERTICAL);
		} else {
			this.startSide = 'left';
			this.endSide = 'right';
			this.options.vertical = false;
		}

		// TODO: use transform instead of position
		this.wrapper.css(this.endSide, '0px');
		this.checkBoundaries();

		if(this.options.arrowSelector) {
			this.setArrowEvents();
		}

		if(this.options.draggable == undefined || this.options.draggable) {
			// TODO: Kinda gross passing funcs as params like this. Refactor.
			this.dragHelper = new DragHelper(this.wrapper, this.inner, this.options.vertical, () => { return this.getCurrentPos() }, () => { this.checkBoundaries(); });
			this.dragHelper.addEvents();
		}

		if (this.options.autoplay) {
			this.wrapper.addClass(YASCL.CLASS_AUTOPLAY);
			this.animate(YASCL.DIRECTION_BACKWARDS);
		}
	}


	// TODO: slideToEdge + loop + move right issue
	// TODO: autoplay to end and have to click left twice to move
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
	animate(direction) {
		// If slider is already moving, ignore trigger
		if (this.wrapper.hasClass(YASCL.CLASS_ANIMATING)) return;
		this.wrapper.addClass(YASCL.CLASS_ANIMATING);

		// Prepare looped item if moving right and prior to animation
		const loop = this.options.loop || false;
		if(loop) this.moveLoopedItem(direction, YASCL.STATE_PRE_ANIMATION);

		// Get easing value
		// TODO: create class for getting options values
		const easing = this.options.easing || "linear";
		// Get new position value
		const end = this.getCurrentPos() + this.getMovementDistance(direction);

		this.wrapper.animate({ [this.endSide]: end }, this.options.time, easing, () => {
			if(this.wrapper.find(":animated").length > 0) return;
			this.wrapper.removeClass(YASCL.CLASS_ANIMATING);

			if(loop) this.moveLoopedItem(direction, YASCL.STATE_POST_ANIMATION);
			const boundaryCrossed = loop || this.checkBoundaries();

			// TODO: add autoplay delay option
			if (boundaryCrossed && this.wrapper.hasClass(YASCL.CLASS_AUTOPLAY)) {
				this.animate(direction);
			}

		});
	}


	getCurrentPos() {
		return ParseUtils.pixelsToInt(this.wrapper.css(this.endSide));
	}


	getMovementDistance(direction) {
		const slideToEdge = this.options.slideToEdge || false;
		// TODO: Refactor different wrappers to different classes?
		const innerStart = this.inner.offset()[this.startSide] + ParseUtils.pixelsToInt(this.inner.css('padding-' + this.startSide));

		let start, end, operand, distance = 0;
		let items = this.wrapper.children();

		if (direction === YASCL.DIRECTION_BACKWARDS) start = 0, end = items.length, operand = 1;
		else start = items.length - 1, end = 0, operand = -1;

		for(let i = start; direction === YASCL.DIRECTION_BACKWARDS ? i < end : i >= end; i += operand) {
			let item = jQuery(items[i]);
			let itemStart = item.offset()[this.startSide];

			if(direction === YASCL.DIRECTION_BACKWARDS && itemStart > innerStart) {

				distance = itemStart - innerStart;
				break;

			} else if(direction === YASCL.DIRECTION_FORWARDS) {
				const innerEnd = innerStart + (this.options.vertical ? this.inner.outerHeight() : this.inner.outerWidth());
				const itemEnd = itemStart + (this.options.vertical ? item.outerHeight() : item.outerWidth());

				if(slideToEdge && itemEnd < innerEnd) {

					distance = itemEnd - innerEnd;
					break;

				} else if(!slideToEdge && itemStart < innerStart) {

					distance = itemStart - innerStart;
					break;

				}
			}
		}

		const overstep = this.getBoundaryOverstep(direction);
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


	// Set click events for navigation arrows
	setArrowEvents() {
		if(this.options.localArrows != null && this.options.localArrows) {
			// If localArrows is true, search for arrows in parent element
			this.arrows = this.parent.find(this.options.arrowSelector);
		} else {
			// Else search DOM for arrows
			this.arrows = jQuery(this.options.arrowSelector);
		}

		// Add click events to each arrow
		this.arrows.click((e) => {
			let direction;

			// Legacy class check
			if(jQuery(e.currentTarget).hasClass("right")) {
				direction = YASCL.DIRECTION_BACKWARDS;
			} else {
				// Assume next arrow unless has prev arrow class
				direction = jQuery(e.currentTarget).hasClass(YASCL.CLASS_PREV_ARROW) ? YASCL.DIRECTION_FORWARDS : YASCL.DIRECTION_BACKWARDS;
			}

			// If arrow clicked it should stop autoplay
			this.wrapper.removeClass(YASCL.CLASS_AUTOPLAY);
			// Trigger animation
			this.animate(direction);
		});
	}


	getBoundaryOverstep(direction, asBool = false) {
		const items = this.wrapper.children();
		const slide = direction === YASCL.DIRECTION_BACKWARDS ? items.last() : items.first();

		const innerStart = this.inner.offset()[this.startSide] + ParseUtils.pixelsToInt(this.inner.css('padding-' + this.startSide));
		const slideStart = slide.offset()[this.startSide];

		if(direction === YASCL.DIRECTION_BACKWARDS) {

			const innerEnd = innerStart + (this.options.vertical ? this.inner.outerHeight() : this.inner.outerWidth());
			const slideSize = this.options.vertical ? slide.outerHeight() : slide.outerWidth();
			const slideEnd = slideStart + slideSize;

			return asBool ? slideEnd > innerEnd : slideEnd - innerEnd;

		} else if(direction === YASCL.DIRECTION_FORWARDS) {

			return asBool ? slideStart < innerStart : slideStart - innerStart;

		}
	}


	checkBoundary(boundary) {
		const direction = boundary === "start" ? YASCL.DIRECTION_FORWARDS : YASCL.DIRECTION_BACKWARDS;
		const isOverstep = this.getBoundaryOverstep(direction, true);

		this.toggleArrow(direction, isOverstep);

		return isOverstep;
	}


	// Check boundaries on both sides
	checkBoundaries() {
		const startOverstep = this.checkBoundary("start");
		const endOverstep = this.checkBoundary("end");
		return startOverstep || endOverstep;
	}


	// Show / hide arrow
	toggleArrow(direction, state = true) {
		if (this.arrows == null) return;

		let arrowEl;

		if (direction === YASCL.DIRECTION_FORWARDS) {
			arrowEl = this.arrows.filter("." + YASCL.CLASS_PREV_ARROW);
		} else {
			arrowEl = this.arrows.not("." + YASCL.CLASS_PREV_ARROW);
		}

		arrowEl.toggle(state);
	}
}
