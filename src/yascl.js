
class YASCL {
	constructor(options) {
		this.options = options;

		this.parent = jQuery(this.options.selector);
		if (this.parent.length === 0 || this.parent.hasClass('yascl')) return;
		this.parent.addClass('yascl');

		if(this.options.innerSelector) this.inner = this.parent.find(this.options.innerSelector);
		if(this.inner == null || this.inner.length === 0) this.inner = this.parent;
		this.inner.children().wrapAll('<div class="yascl-wrapper"></div>');
		this.wrapper = this.inner.children('.yascl-wrapper');

		const boundaryCrossed = this.checkVirtualBoundaries(true);

		if (this.options.arrowSelector) {
			this.setArrowEvents();
		}

		if (boundaryCrossed && this.options.autoplay) {
			this.wrapper.addClass("autoplay");
			this.animate("left");
		}
	}


	animate(direction) {
		if (this.wrapper.hasClass("animating")) return;
		this.wrapper.addClass("animating");

		const easing = this.options.easing || "linear";
		const loop = this.options.loop === null ? true : this.options.loop;
		const right = this.moveItem(direction, loop, "pre-animation");

		this.wrapper.children().animate({ right: right }, this.options.time, easing, () => {
			if (this.wrapper.find(":animated").length > 0) return;

			this.moveItem(direction, loop, "post-animation");

			const reachedBoundary = loop ? false : this.checkVirtualBoundaries();

			this.wrapper.removeClass("animating");

			if (!reachedBoundary && this.wrapper.hasClass("autoplay")) {
				this.animate(direction);
			}
		});
	}


	moveItem(direction, loop, state) {
		const eq = direction === "left" ? 0 : -1;
		const items = this.wrapper.children();
		const item = items.eq(eq);
		const right = parseInt(item.css('right').replace('px', ''));
		const width = item.outerWidth(true);

		if (direction === "left") {
			if (loop && state === "post-animation") {
				item.appendTo(this.wrapper);
				items.css("right", "0px");
				return width;
			}
			return right + width;
		} else {
			if (loop && state === "pre-animation") {
				item.prependTo(this.wrapper);
				items.css("right", width);
				return "0px";
			}
			return right - width;
		}
	}


	setArrowEvents() {
		const arrows = jQuery(this.options.arrowSelector);

		arrows.click((e) => {
			const direction = jQuery(e.currentTarget).hasClass("right") ? "left" : "right";
			this.wrapper.removeClass("autoplay");
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


	checkVirtualBoundaries(invertCheck = false) {
		const reachedLeft = this.checkVirtualBoundary("left");
		const reachedRight = this.checkVirtualBoundary("right");
		return invertCheck ? !reachedLeft || !reachedLeft : reachedLeft || reachedRight;
	}


	toggleArrow(arrow, state = true) {
		if (this.options.arrowSelector == null) return;

		let arrowEl;
		let arrowEls = jQuery(this.options.arrowSelector);

		if (arrow == "right") {
			arrowEl = arrowEls.filter(".right");
		} else {
			arrowEl = arrowEls.not(".right");
		}

		arrowEl.toggle(state);
	}
}
