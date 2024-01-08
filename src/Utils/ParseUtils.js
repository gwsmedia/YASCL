
export default class ParseUtils {
	static pixelsToInt(pixels) {
		// Round down subpixels to avoid incorrect comparisons
		return Math.floor(pixels.replace('px', ''));
	}
}
