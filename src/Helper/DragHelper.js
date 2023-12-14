
export default class DragHelper {
	constructor(wrapper, inner, vertical, getCurrentPos, checkBoundaries) {
		this.wrapper = wrapper;
		this.inner = inner;
		this.vertical = vertical;
		this.getCurrentPos = getCurrentPos;
		this.checkBoundaries = checkBoundaries;

		this.pos = 0;
		this.mousePos = 0;
		this.startMousePos = 0;
		this.movedPos = 0;
		this.moving = false;
		this.clickedLink = false;
	}

	getClientPos(event) {
		let eventData;

		if(['touchstart', 'touchmove','touchend'].includes(event.type)) {
			eventData = event.touches[0];
		} else {
			eventData = event;
		}

		return this.vertical ? event.clientY : event.clientX;
	}

	dragStart(event) {
		this.moving = true;
		this.movedPos = 0;
		this.startPos = this.getCurrentPos();
		this.startMousePos = this.getClientPos(event);
	}

	dragEnd(event) {
		this.moving = false;
	}

	dragMove(event) {
		if(event.type == 'mousemove') event.preventDefault();
		if(!this.moving) return;

		this.movedPos = this.startMousePos - this.getClientPos(event);
		this.pos = this.startPos + this.movedPos;

		const wrapperSize = this.vertical ? this.wrapper.outerHeight() : this.wrapper.outerWidth();
		const innerSize = this.vertical ? this.inner.outerHeight() : this.inner.outerWidth();
		const max = wrapperSize - innerSize;

		if(this.pos < 0) this.pos = 0;
		else if(this.pos > max) this.pos = max;

		jQuery(this.wrapper).css(this.vertical ? 'bottom' : 'right', this.pos + 'px');

		this.checkBoundaries();
	}

	addEvents() {
		this.wrapper.children().click((event) => {
			event.preventDefault();

			if(!this.moving && Math.abs(this.movedPos) < 2) {
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
