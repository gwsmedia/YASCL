
export default class DragHelper {
	constructor(wrapper, inner) {
		this.wrapper = wrapper;
		this.inner = inner;

		this.x = 0;
		this.mouseX = 0;
		this.startMouseX = 0;
		this.moving = false;
	}

	addEvents(getCurrentPos, checkBoundaries) {
		this.wrapper.on("mousedown", (event) => {
			this.moving = true;
			this.startX = getCurrentPos();
			this.startMouseX = event.clientX;
		});

		document.addEventListener("mouseup", (event) => {
			this.moving = false;
		});

		document.addEventListener("mousemove", (event) => {
			event.preventDefault();
			if(this.moving) {

				this.x = this.startX + this.startMouseX - event.clientX;

				const max = this.wrapper.outerWidth() - this.inner.outerWidth();

				if(this.x < 0) this.x = 0;
				else if(this.x > max) this.x = max;

				jQuery(this.wrapper).css('right', this.x + 'px');

				checkBoundaries();
			}
		});
	}
}
