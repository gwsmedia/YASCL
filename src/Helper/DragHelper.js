
export default class DragHelper {
	constructor(wrapper, inner, getCurrentPos, checkBoundaries) {
		this.wrapper = wrapper;
		this.inner = inner;
		this.getCurrentPos = getCurrentPos;
		this.checkBoundaries = checkBoundaries;

		this.x = 0;
		this.mouseX = 0;
		this.startMouseX = 0;
		this.movedX = 0;
		this.moving = false;
		this.clickedLink = false;
	}

	getClientX(event) {
		if(['touchstart', 'touchmove','touchend'].includes(event.type)) {
			return event.touches[0].clientX;
		} else {
			return event.clientX;
		}
	}

	dragStart(event) {
		this.moving = true;
		this.movedX = 0;
		this.startX = this.getCurrentPos();
		this.startMouseX = this.getClientX(event);
	}

	dragEnd(event) {
		this.moving = false;
	}

	dragMove(event) {
		if(!this.moving) return;
		else if(event.type == 'mousemove') event.preventDefault();

		this.movedX = this.startMouseX - this.getClientX(event);
		this.x = this.startX + this.movedX;

		const max = this.wrapper.outerWidth() - this.inner.outerWidth();

		if(this.x < 0) this.x = 0;
		else if(this.x > max) this.x = max;

		jQuery(this.wrapper).css('right', this.x + 'px');

		this.checkBoundaries();
	}

	addEvents() {
		this.wrapper.children().click((event) => {
			event.preventDefault();

			if(!this.moving && Math.abs(this.movedX) < 2) {
				let link = jQuery(event.target).closest('a').attr('href');
				if(link != undefined) location.href = link;
			}
		});

		this.wrapper.on("mousedown", this.dragStart.bind(this));
		this.wrapper.on("touchstart", this.dragStart.bind(this));

		document.addEventListener("mouseup", this.dragEnd.bind(this));
		document.addEventListener("touchend", this.dragEnd.bind(this));

		document.addEventListener("mousemove", this.dragMove.bind(this));
		document.addEventListener("touchmove", this.dragMove.bind(this));
	}
}
