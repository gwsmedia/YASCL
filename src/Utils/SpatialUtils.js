import ParseUtils from "./ParseUtils";

export default class SpatialUtils {
	static get SIDE_TOP() { return 'top'; }
	static get SIDE_LEFT() { return 'left'; }
	static get SIDE_RIGHT() { return 'right'; }
	static get SIDE_BOTTOM() { return 'bottom'; }

	static getSidePos(el, side, includePadding = true, includeMargin = false, startSidePos = null) {
		let pos;

		if (startSidePos) {
			pos = startSidePos;
		} else {
			let startSide;

			if (side === SpatialUtils.SIDE_RIGHT) {
				startSide = SpatialUtils.SIDE_LEFT;
			} else if (side === SpatialUtils.SIDE_BOTTOM) {
				startSide = SpatialUtils.SIDE_TOP;
			} else {
				startSide = side;
			}

			pos = el.offset()[startSide];
		}

		switch(side) {
			case SpatialUtils.SIDE_TOP:
			case SpatialUtils.SIDE_LEFT:

				if(!includePadding) {
					const border = SpatialUtils.getBorderWidth(el, side);
					const padding = ParseUtils.pixelsToInt(el.css('padding-' + side));

					pos += border + padding;
				} else if(includeMargin) {
					pos -= ParseUtils.pixelsToInt(el.css('margin-' + side));
				}

				break;

			case SpatialUtils.SIDE_RIGHT:
			case SpatialUtils.SIDE_BOTTOM:
				pos += SpatialUtils.getSize(el, side == SpatialUtils.SIDE_BOTTOM, includePadding, includeMargin);
				break;

			default:
				return;
		}

		// Round down subpixels to avoid incorrect comparisons
		return Math.round(pos);
	}

	static getSize(el, isVertical, includePadding = true, includeMargin = false) {
		let size, border;
		const boxSizing = el.css('box-sizing');

		if(boxSizing == 'border-box') {
			const startSide = isVertical ? SpatialUtils.SIDE_TOP : SpatialUtils.SIDE_LEFT;
			const endSide = isVertical ? SpatialUtils.SIDE_BOTTOM : SpatialUtils.SIDE_RIGHT;
			border = SpatialUtils.getBorderWidth(el, startSide) + SpatialUtils.getBorderWidth(el, endSide);
		} else {
			border = 0;
		}

		if(isVertical) {
			size = includePadding ? el.outerHeight(includeMargin) : el.height() + border;
		} else {
			size = includePadding ? el.outerWidth(includeMargin) : el.width() + border;
		}

		return Math.round(size);
	}

	static getBorderWidth(el, side) {
		return ParseUtils.pixelsToInt(el.css('border-' + side + '-width'));
	}
}
