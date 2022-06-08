

// YASCL -- Yet Another Simple Carousel Library
// Developed by Jerome Beckett, 2022


function yascl_initialise(options) {
	let parent = jQuery(options.selector);
	if (parent.length === 0) return;

	if (options.autoplay) {
		parent.addClass("autoplay");
		yascl_animate(parent, "left", options);
	}

	if (options.arrowSelector) {
		yascl_set_arrow_events(options);
	}
}


function yascl_animate(parent, direction, options) {
	if (parent.hasClass("animating")) return;
	parent.addClass("animating");
	
	let items = parent.children();
	let easing = options.easing ? options.easing : "linear";
	let right = yascl_move_item(parent, items, direction, "pre-animation");
	
	items.animate({ right: right }, options.time, easing, function () {
		if (parent.find(":animated").length > 0) return;

		yascl_move_item(parent, items, direction, "post-animation");

		parent.removeClass("animating");
		if (parent.hasClass("autoplay")) yascl_animate(parent, direction, options);
	});
}


function yascl_move_item(parent, items, direction, state) {
	let right;
	let eq = direction == "left" ? 0 : -1;
	let item = items.eq(eq);
	let width = item.outerWidth(true);
	
	if(direction == "left") {
		if(state == "post-animation") {
			item.appendTo(parent);
			items.css("right", "0px");
		}
		return width;
	} else {
		if(state == "pre-animation") {
			item.prependTo(parent);
			items.css("right", width);
		}
		return "0px";
	}
}


function yascl_set_arrow_events(options) {
	let arrows = jQuery(options.arrowSelector);

	arrows.click(function () {
		let direction = jQuery(this).hasClass("left") ? "left" : "right";
		let parent = jQuery(options.selector);
		parent.removeClass("autoplay");
		yascl_animate(parent, direction, options);
	});
}

