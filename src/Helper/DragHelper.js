
export default class DragHelper {
	constructor(wrapper, inner) {
		this.wrapper = wrapper;
		this.inner = inner;

		this.x = 0;
		this.mouseX = 0;
		this.startMouseX = 0;
		this.movedX = 0;
		this.moving = false;
		this.clickedLink = false;
	}

	addEvents(getCurrentPos, checkBoundaries) {
		this.wrapper.children().click((event) => {
			event.preventDefault();

			if(!this.moving && Math.abs(this.movedX) < 2) {
				let link = jQuery(event.target).closest('a').attr('href');
				if(link != undefined) location.href = link;
			}
		});

		this.wrapper.on("mousedown", (event) => {
			this.moving = true;
			this.movedX = 0;
			this.startX = getCurrentPos();
			this.startMouseX = event.clientX;
		});

		document.addEventListener("mouseup", (event) => {
			this.moving = false;
		});

		document.addEventListener("mousemove", (event) => {
			event.preventDefault();
			if(this.moving) {
				this.movedX = this.startMouseX - event.clientX;
				this.x = this.startX + this.movedX;

				const max = this.wrapper.outerWidth() - this.inner.outerWidth();

				if(this.x < 0) this.x = 0;
				else if(this.x > max) this.x = max;

				jQuery(this.wrapper).css('right', this.x + 'px');

				checkBoundaries();
			}
		});
	}
}
