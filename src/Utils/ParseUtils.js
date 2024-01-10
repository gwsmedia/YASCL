
export default class ParseUtils {
	static pixelsToInt(pixels) {
		// Round down subpixels past 1DP to avoid incorrect comparisons
		return Math.floor(pixels.replace('px', '') * 10) / 10;
	}
}
