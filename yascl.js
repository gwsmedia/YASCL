

// YASCL -- Yet Another Simple Carousel Library
// Developed by Jerome Beckett, 2022

// TODO: Rewrite as OOP
// TODO: Remove jQuery dependency?
// TODO: Left and right discrepancy: arrow side or movement direction?
// TODO: Rename inner and wrapper variables?
// TODO: Stop slider when reaching virtual boundary instead of waiting until full movement finished
// TODO: Ability to drag slider

function yascl_initialise(options) {
	let parent = jQuery(options.selector);
	if (parent.length === 0 || parent.hasClass('yascl')) return;
	parent.addClass('yascl');

	let inner;
	if(options.innerSelector) inner = parent.find(options.innerSelector);
	if(inner == null || inner.length === 0) inner = parent;
	inner.children().wrapAll('<div class="yascl-wrapper"></div>');
	let wrapper = inner.children('.yascl-wrapper');

	if(!options.loop) {
		yascl_reached_virtual_boundary(inner, wrapper.children(), "right", options)
	}

	if (options.arrowSelector) {
		yascl_set_arrow_events(options);
	}

	if (options.autoplay) {
		wrapper.addClass("autoplay");
		yascl_animate(inner, wrapper, "left", options);
	}
}


function yascl_animate(inner, wrapper, direction, options) {
	if (wrapper.hasClass("animating")) return;
	wrapper.addClass("animating");

	let items = wrapper.children();
	let easing = options.easing ? options.easing : "linear";
	let loop = options.loop == null ? true : options.loop;
	let right = yascl_move_item(wrapper, items, direction, loop, "pre-animation");

	items.animate({ right: right }, options.time, easing, function () {
		if (wrapper.find(":animated").length > 0) return;

		yascl_move_item(wrapper, items, direction, loop, "post-animation");

		let reachedBoundary = loop ? false : yascl_reached_virtual_boundary(inner, items, direction, options);

		wrapper.removeClass("animating");
		if (!reachedBoundary && wrapper.hasClass("autoplay")) yascl_animate(inner, wrapper, direction, options);
	});
}


function yascl_move_item(wrapper, items, direction, loop, state) {
	let eq = direction == "left" ? 0 : -1;
	let item = items.eq(eq);
	let right = parseInt(item.css('right').replace('px', ''));
	let width = item.outerWidth(true);

	if(direction == "left") {
		if(loop && state == "post-animation") {
			item.appendTo(wrapper);
			items.css("right", "0px");
			return width;
		}
		return right + width;
	} else {
		if(loop && state == "pre-animation") {
			item.prependTo(wrapper);
			items.css("right", width);
			return "0px";
		}
		return right - width;
	}
}


function yascl_set_arrow_events(options) {
	let arrows = jQuery(options.arrowSelector);

	arrows.click(function () {
		let direction = jQuery(this).hasClass("right") ? "left" : "right";
		let inner = options.innerSelector == null ? jQuery('.yascl') : jQuery(options.innerSelector);
		let wrapper = jQuery(options.selector).parent().find('.yascl-wrapper');
		wrapper.removeClass("autoplay");
		yascl_animate(inner, wrapper, direction, options);
	});
}


function yascl_get_boundary_overstep(inner, items, direction) {
	let slide = direction == "left" ? items.last() : items.first();

	let slideLeft = slide.offset().left;
	let slideWidth = slide.outerWidth();
	let slideRight = slideLeft + slideWidth;

	let innerLeft = inner.offset().left;
	let innerRight = innerLeft + inner.outerWidth();

	let outOfBounds = direction == "left" ? slideRight - innerRight : innerLeft - slideLeft;
	return outOfBounds / slideWidth;
}


function yascl_reached_virtual_boundary(inner, items, direction, options) {
	let overstep = yascl_get_boundary_overstep(inner, items, direction);
	let threshold = options.overstepThreshold == null ? 0.10 : options.overstepThreshold;
	let reached = overstep <= threshold;

	let boundaryArrow;
	let oppositeArrow;
	if(direction == "left") {
		boundaryArrow = "right";
		oppositeArrow = "left";
	} else {
		boundaryArrow = "left";
		oppositeArrow = "right";
	}

	yascl_toggle_arrow(boundaryArrow, options, !reached);
	yascl_toggle_arrow(oppositeArrow, options, true);

	return reached;
}


function yascl_toggle_arrow(arrow, options, state = true) {
	if(options.arrowSelector == null) return;

	let arrowEl;
	let arrowEls = jQuery(options.arrowSelector);

	if(arrow == "right") {
		arrowEl = arrowEls.filter(".right");
	} else {
		arrowEl = arrowEls.not(".right");
	}

	arrowEl.toggle(state);
}
