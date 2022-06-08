

// YASCL -- Yet Another Simple Carousel Library
// Developed by Jerome Beckett, 2022


function yascl_initialise(options) {
	let parent = jQuery(options.selector);
	if (parent.length === 0) return;

	if (options.autoplay) {
		parent.addClass("autoplay");
		yascl_animate_left(parent, options.time, true);
	}

	if (options.arrowSelector) {
		yascl_set_arrow_events(options);
	}
}


function yascl_animate_left(parent, time) {
	if (parent.hasClass("animating")) return;
	parent.addClass("animating");
	let items = parent.children();

	items.animate({ right: items.eq(0).outerWidth(true) }, time, "linear", function () {
			if (jQuery(":animated").length > 0) return;

			items.eq(0).appendTo(parent);
			items.css("right", "0px");

			parent.removeClass("animating");
			if (parent.hasClass("autoplay")) yascl_animate_left(parent, time, true);
		}
	);
}


function yascl_animate_right(parent, time) {
	if (parent.hasClass("animating")) return;
	parent.addClass("animating");
	let items = parent.children();

	let firstItem = items.eq(-1);
	firstItem.prependTo(parent);
	items.css("right", firstItem.outerWidth(true));

	items.animate({ right: "0px" }, time, "linear", function () {
		if (jQuery(":animated").length > 0) return;
		
		parent.removeClass("animating");
		if (parent.hasClass("autoplay")) yascl_animate_right(parent, time, true);
	});
}


function yascl_set_arrow_events(options) {
	let arrows = jQuery(options.arrowSelector);

	arrows.click(function () {
		let parent = jQuery(options.selector);
		parent.removeClass("autoplay");

		if (jQuery(this).hasClass("left")) {
			yascl_animate_left(parent, 200);
		} else {
			yascl_animate_right(parent, 200);
		}
	});
}

