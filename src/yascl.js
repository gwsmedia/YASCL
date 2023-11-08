import './yascl.css';
import jQuery from 'jquery';


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
		this.wrapper.css('right', '0px');

		if (this.options.arrowSelector) {
			this.setArrowEvents();
		}

		const boundaryCrossed = this.options.loop || this.checkVirtualBoundaries(true);

		if (boundaryCrossed && this.options.autoplay) {
			this.wrapper.addClass("autoplay");
			this.animate("left");
		}
	}


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
		const easing = this.options.easing || "linear";
		// Get new position value
		const right = this.getCurrentPos() + this.getMovementDistance(direction);

		this.wrapper.animate({ right: right }, this.options.time, easing, () => {
			if(this.wrapper.find(":animated").length > 0) return;

			if(loop) this.moveLoopedItem(direction, "post-animation");

			const reachedBoundary = loop ? false : this.checkVirtualBoundaries();

			this.wrapper.removeClass("animating");

			// TODO: add autoplay delay option
			if (!reachedBoundary && this.wrapper.hasClass("autoplay")) {
				this.animate(direction);
			}
		});
	}


	getCurrentPos() {
		return parseInt(this.wrapper.css('right').replace('px', ''));
	}


	getMovementDistance(direction) {
		const slideToEdge = this.options.slideToEdge || false;
		const innerLeft = this.inner.offset().left;

		let start, end, operand;
		let items = this.wrapper.children();

		if (direction === 'left') start = 0, end = items.length, operand = 1;
		else start = items.length - 1, end = 0, operand = -1;

		for(let i = start; direction == 'left' ? i < end : i >= end; i += operand) {
			let item = jQuery(items[i]);
			let itemLeft = item.offset().left;

			if(direction == 'left') {
				if(itemLeft > innerLeft) {

					return itemLeft - innerLeft;

				} else {

					// TODO: add RTL option

				}
			} else if(direction == 'right') {
				const innerRight = innerLeft + this.inner.outerWidth();
				const itemRight = itemLeft + item.outerWidth();

				if(slideToEdge && itemRight < innerRight) {

					return itemRight - innerRight;

				} else if(!slideToEdge && itemLeft < innerLeft) {

					return itemLeft - innerLeft;

				}
			}
		}
	}


	// TODO: Move state values to constants
	// Move items to continue loop
	moveLoopedItem(direction, state) {
		const eq = direction === "left" ? 0 : -1;
		const items = this.wrapper.children();
		// Get first or last item in set depending on direction
		const item = items.eq(eq);

		if (direction === "left" && state === "post-animation") {
			// Move first item to end
			item.appendTo(this.wrapper);
			// Reset translation (would be offset otherwise,
			// due to the first item moving to the end)
			this.wrapper.css("right", "0px");
		} else if (direction == "right" && state === "pre-animation") {
			// Move last item to start
			item.prependTo(this.wrapper);
			// Get full width of item including margins
			const width = item.outerWidth(true);
			// Set translation to width of item ready to move into slider
			this.wrapper.css("right", width);
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
			// Assume left arrow unless has .right class
			const direction = jQuery(e.currentTarget).hasClass("right") ? "left" : "right";
			// If arrow clicked it should stop autoplay
			this.wrapper.removeClass("autoplay");
			// Trigger animation
			this.animate(direction);
		});
	}


	getBoundaryOverstep(direction) {
		const items = this.wrapper.children();
		const slide = direction == "left" ? items.last() : items.first();

		const slideLeft = slide.offset().left;
		const slideWidth = slide.outerWidth();
		const slideRight = slideLeft + slideWidth;

		const innerLeft = this.inner.offset().left;
		const innerRight = innerLeft + this.inner.outerWidth();

		const outOfBounds = direction === "left" ? slideRight - innerRight : innerLeft - slideLeft;
		return outOfBounds / slideWidth;
	}


	checkVirtualBoundary(direction) {
		const overstep = this.getBoundaryOverstep(direction);
		const threshold = this.options.overstepThreshold || 0.10;
		const reached = overstep <= threshold;

		this.toggleArrow(direction === "left" ? "right" : "left", !reached);

		return reached;
	}


	// Check boundaries on both sides
	checkVirtualBoundaries(invertCheck = false) {
		const reachedLeft = this.checkVirtualBoundary("left");
		const reachedRight = this.checkVirtualBoundary("right");
		return invertCheck ? !reachedLeft || !reachedLeft : reachedLeft || reachedRight;
	}


	// Show / hide arrow
	toggleArrow(arrow, state = true) {
		if (this.arrows == null) return;

		let arrowEl;

		if (arrow == "right") {
			arrowEl = this.arrows.filter(".right");
		} else {
			arrowEl = this.arrows.not(".right");
		}

		arrowEl.toggle(state);
	}
}
