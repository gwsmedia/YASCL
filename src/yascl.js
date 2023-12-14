import './yascl.css';
import jQuery from 'jquery';
import DragHelper from './Helper/DragHelper';
import ParseUtils from './Utils/ParseUtils';


export default class YASCL {
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

		if(this.parent.length === 0 || this.parent.hasClass('yascl')) {
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
		options.selector += '.processing';
		options.skipDomReady = true;

		// Initialise each slider
		this.parent.each(function() {
			jQuery(this).addClass('processing');
			new YASCL(options);
			jQuery(this).removeClass('processing');
		});
	}


	initialiseSingle() {
		this.wrapChildren();

		if(this.options.vertical != null && this.options.vertical) {
			this.startSide = 'top';
			this.endSide = 'bottom';
			this.wrapper.addClass("vertical");
		} else {
			this.startSide = 'left';
			this.endSide = 'right';
			this.options.vertical = false;
		}

		// TODO: use transform instead of position
		this.wrapper.css(this.endSide, '0px');

		if(this.options.arrowSelector) {
			this.setArrowEvents();
		}

		if(this.options.draggable == undefined || this.options.draggable) {
			// TODO: Kinda gross passing funcs as params like this. Refactor.
			this.dragHelper = new DragHelper(this.wrapper, this.inner, this.options.vertical, () => { return this.getCurrentPos() }, () => { this.checkBoundaries(); });
			this.dragHelper.addEvents();
		}

		const boundaryCrossed = this.options.loop || this.checkBoundaries();

		if (boundaryCrossed && this.options.autoplay) {
			this.wrapper.addClass("autoplay");
			this.animate("backwards");
		}
	}


	// TODO: slideToEdge + loop + move right issue
	// TODO: autoplay to end and have to click left twice to move
	// Wrap all slider items in slider wrapper
	wrapChildren() {
		this.parent.addClass('yascl');

		// Find inner wrapper if defined
		if(this.options.innerSelector) this.inner = this.parent.find(this.options.innerSelector);

		// If it counldn't be found, the parent and inner wrapper are the same
		if(this.inner == null || this.inner.length === 0) this.inner = this.parent;

		// Wrap children with .yascl-wrapper
		this.inner.children().wrapAll('<div class="yascl-wrapper"></div>');

		// Get new wrapper as object
		this.wrapper = this.inner.children('.yascl-wrapper');
	}


	// Entry point for slider movement
	animate(direction) {
		// If slider is already moving, ignore trigger
		if (this.wrapper.hasClass("animating")) return;
		this.wrapper.addClass("animating");

		// Prepare looped item if moving right and prior to animation
		const loop = this.options.loop || false;
		if(loop) this.moveLoopedItem(direction, "pre-animation");

		// Get easing value
		// TODO: create class for getting options values
		const easing = this.options.easing || "linear";
		// Get new position value
		const end = this.getCurrentPos() + this.getMovementDistance(direction);

		this.wrapper.animate({ [this.endSide]: end }, this.options.time, easing, () => {
			if(this.wrapper.find(":animated").length > 0) return;
			this.wrapper.removeClass("animating");

			if(loop) this.moveLoopedItem(direction, "post-animation");
			const boundaryCrossed = loop || this.checkBoundaries();

			// TODO: add autoplay delay option
			if (boundaryCrossed && this.wrapper.hasClass("autoplay")) {
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

		if (direction === 'backwards') start = 0, end = items.length, operand = 1;
		else start = items.length - 1, end = 0, operand = -1;

		for(let i = start; direction == 'backwards' ? i < end : i >= end; i += operand) {
			let item = jQuery(items[i]);
			let itemStart = item.offset()[this.startSide];

			if(direction == 'backwards') {
				if(itemStart > innerStart) {

					distance = itemStart - innerStart;
					break;

				} else {

					// TODO: add RTL option

				}
			} else if(direction == 'forwards') {
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


	// TODO: Move state values to constants
	// Move items to continue loop
	moveLoopedItem(direction, state) {
		const eq = direction === "backwards" ? 0 : -1;
		const items = this.wrapper.children();
		// Get first or last item in set depending on direction
		const item = items.eq(eq);

		if (direction === "backwards" && state === "post-animation") {
			// Move first item to end
			item.appendTo(this.wrapper);
			// Reset translation (would be offset otherwise,
			// due to the first item moving to the end)
			this.wrapper.css(this.endSide, "0px");
		} else if (direction == "forwards" && state === "pre-animation") {
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
			// Assume backwards arrow unless has .forwards class
			const direction = jQuery(e.currentTarget).hasClass("forwards") ? "backwards" : "forwards";
			// If arrow clicked it should stop autoplay
			this.wrapper.removeClass("autoplay");
			// Trigger animation
			this.animate(direction);
		});
	}


	getBoundaryOverstep(direction, asBool = false) {
		const items = this.wrapper.children();
		const slide = direction == "backwards" ? items.last() : items.first();

		const innerStart = this.inner.offset()[this.startSide] + ParseUtils.pixelsToInt(this.inner.css('padding-' + this.startSide));
		const slideStart = slide.offset()[this.startSide];

		if(direction == "backwards") {

			const innerEnd = innerStart + (this.options.vertical ? this.inner.outerHeight() : this.inner.outerWidth());
			const slideSize = this.options.vertical ? slide.outerHeight() : slide.outerWidth();
			const slideEnd = slideStart + slideSize;

			return asBool ? slideEnd > innerEnd : slideEnd - innerEnd;

		} else if(direction == "forwards") {

			return asBool ? slideStart < innerStart : slideStart - innerStart;

		}
	}


	// TODO: Rename functions
	checkBoundary(boundary) {
		const direction = boundary === "start" ? "forwards" : "backwards";
		const isOverstep = this.getBoundaryOverstep(direction, true);

		this.toggleArrow(boundary, isOverstep);

		return isOverstep;
	}


	// Check boundaries on both sides
	checkBoundaries() {
		const startOverstep = this.checkBoundary("start");
		const endOverstep = this.checkBoundary("end");
		return startOverstep || endOverstep;
	}


	// Show / hide arrow
	toggleArrow(arrow, state = true) {
		if (this.arrows == null) return;

		let arrowEl;

		if (arrow == "forwards") {
			arrowEl = this.arrows.filter(".forwards");
		} else {
			arrowEl = this.arrows.not(".forwards");
		}

		arrowEl.toggle(state);
	}
}
