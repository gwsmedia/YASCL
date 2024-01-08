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
					const border = ParseUtils.pixelsToInt(el.css('border-' + side + '-width'));
					const padding = ParseUtils.pixelsToInt(el.css('padding-' + side));

					pos += border + padding;
				} else if(includeMargin) {
					pos -= ParseUtils.pixelsToInt(el.css('margin-' + side));
				}

				break;

			case PositionUtils.SIDE_RIGHT:
				pos += includePadding ? el.outerWidth(includeMargin) : el.width();
				break;

			case PositionUtils.SIDE_BOTTOM:
				pos += includePadding ? el.outerHeight(includeMargin) : el.height();
				break;

			default:
				return;
		}

		// Round down subpixels to avoid incorrect comparisons
		return Math.floor(pos);
	}
}
