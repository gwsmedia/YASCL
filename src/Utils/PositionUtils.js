import ParseUtils from "./ParseUtils";

export default class PositionUtils {
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

			if (side === PositionUtils.SIDE_RIGHT) {
				startSide = PositionUtils.SIDE_LEFT;
			} else if (side === PositionUtils.SIDE_BOTTOM) {
				startSide = PositionUtils.SIDE_TOP;
			} else {
				startSide = side;
			}

			pos = el.offset()[startSide];
		}

		switch(side) {
			case PositionUtils.SIDE_TOP:
			case PositionUtils.SIDE_LEFT:

				if(!includePadding) {
					const border = PositionUtils.getBorderWidth(el, side);
					const padding = ParseUtils.pixelsToInt(el.css('padding-' + side));

					pos += border + padding;
				} else if(includeMargin) {
					pos -= ParseUtils.pixelsToInt(el.css('margin-' + side));
				}

				break;

			case PositionUtils.SIDE_RIGHT:
			case PositionUtils.SIDE_BOTTOM:
				pos += PositionUtils.getSize(el, side == PositionUtils.SIDE_BOTTOM, includePadding, includeMargin);
				break;

			default:
				return;
		}

		// Round down subpixels to avoid incorrect comparisons
		return Math.floor(pos);
	}

	static getSize(el, isVertical, includePadding = true, includeMargin = false) {
		let size, border;
		const boxSizing = el.css('box-sizing');

		if(boxSizing == 'border-box') {
			const startSide = isVertical ? PositionUtils.SIDE_TOP : PositionUtils.SIDE_LEFT;
			const endSide = isVertical ? PositionUtils.SIDE_BOTTOM : PositionUtils.SIDE_RIGHT;
			border = PositionUtils.getBorderWidth(el, startSide) + PositionUtils.getBorderWidth(el, endSide);
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
