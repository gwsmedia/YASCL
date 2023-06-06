

// YASCL -- Yet Another Simple Carousel Library
// Developed by Jerome Beckett, 2022


function yascl_initialise(options) {
	let parent = jQuery(options.selector);
	if (parent.length === 0 || parent.hasClass('yascl')) return;
	parent.addClass('yascl');

	let inner;
	if(options.innerSelector) inner = parent.find(options.innerSelector);
	if(inner == null || inner.length === 0) inner = parent;
	inner.children().wrapAll('<div class="yascl-wrapper"></div>');
	let wrapper = inner.children('.yascl-wrapper');

	if (options.autoplay) {
		wrapper.addClass("autoplay");
		yascl_animate(wrapper, "left", options);
	}

	if (options.arrowSelector) {
		yascl_set_arrow_events(options);
	}
}


function yascl_animate(wrapper, direction, options) {
	if (wrapper.hasClass("animating")) return;
	wrapper.addClass("animating");

	let items = wrapper.children();
	let easing = options.easing ? options.easing : "linear";
	let loop = options.loop == null ? true : options.loop;
	let right = yascl_move_item(wrapper, items, direction, loop, "pre-animation");

	items.animate({ right: right }, options.time, easing, function () {
		if (wrapper.find(":animated").length > 0) return;

		yascl_move_item(wrapper, items, direction, loop, "post-animation");

		wrapper.removeClass("animating");
		if (wrapper.hasClass("autoplay")) yascl_animate(wrapper, direction, options);
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
		let wrapper = jQuery(options.selector).parent().find('.yascl-wrapper');
		wrapper.removeClass("autoplay");
		yascl_animate(wrapper, direction, options);
	});
}

