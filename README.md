# YASCL - Yet Another Simple Carousel Library
<sup>_Pronounced Yaskel_</sup>  
**Minimalist endless carousel**

There's many great carousel JS libraries out there, but sometimes you just want a super-simple carousel which allows for extensive styling.

YASCL is perfect for that. It's about as plug-and-play as you can get.

## Installation
### Using npm:
```
npm install yascl
```

Then you can either use ES6 modules + a web bundler:
```
import YASCL from 'yascl';
```

or include the pre-bundled script:

```
<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="node_modules/yascl/dist/yascl.js"></script>
```

### Using a CDN:
```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/gwsmedia/yascl/dist/yascl.js"></script>
```

## Usage
### Simplest usage
```
new YASCL({
	selector: '#id-of-element'
});
```

### Options
**selector** (required)  
This is the CSS selector that will define the slider.  
Unless **innerSelector** is also defined, this means:

- All of its direct children will become slider items.
- For looping to work smoothly the width of this container should at max be the width of one item less than the total width of all items.
In other words if you have 5 items of width 100px, this container should have a max width of 400px.

The selector can map to multiple elements and they will all be instanstiated as separate sliders. The `slide` methods detailed below will apply to
all of the sliders simultaneously, or one can use the `getCarousel` methods to get the inidividual carousels to call the methods on.

**arrowSelector**  
This will define arrows that can be used to control the slider. It should be a CSS class that the next and previous arrows share. The previous arrow **requires** the class `prev` to differentiate it. **The `right` class is now deprecated and functionality based on it will be removed in a further release.**

**time**  
default: `400`  
A number in miliseconds determining how long for one of the carousel items to make one full movement.

**delay**  
default: `5000`  
A number in miliseconds determining how long the carousel will stay on an item before progressing.

**easing**  
default: `linear`  
The easing method of the animation. Can be `swing` or `linear`.

**autoplay**  
default: `false`  
The carousel will start automatically and continue moving. See **reverse** for changing the default direction.

**reverse**  
default: `false`  
By default, the carousel moves from the left slide to the right, or top to bottom if it is vertical. Setting this value to true will invert this. Often called *rtl*.

**loop**  
default: `false`  
Whether the carousel loops or not. If set to false, the carousel will hide the relevant arrow button once the beginning or end of the slider is reached.

**draggable**  
default: `true`  
Whether the carousel is draggable or not.

**vertical**  
default: `false`  
Whether the carousel is vertical or horizontal.

**slideToEdge**  
default: `false`  
Whether the slider will slide to the closest edge of the next item or not.  
If _false_, the top/left edge of the next item will align with the top/left edge of the slider.  
If _true_, the behaviour will remain the same when moving up/left, but when moving down/right the bottom/right edge of the next item will align with the bottom/right edge of the slider.

**innerSelector**  
This is a CSS selector for an optional inner container if a more complex structure is desired. This means you can use **selector** to define a perimiter
outside of which all slider content is hidden. Then you can use the **innerSelector** to define the inner boundaries of the slider which will be used to 
calculate where the slider should "begin" and "end". This means you can hide the arrows at a certain limit but still show the content overflowing out of 
**innerSelector**. If present, the bullet points defined for **selector** will apply to this container instead.

**localArrows**  
default: `false`  
If true, the **arrowSelector** will only be searched for as a descendent of **selector**. In such a case you will need to have an **innerSelector** defined so the
arrows are not considered slider items. This can be useful if the arrows do not have unique **arrowSelector**s.

### Methods
**slideNext()**  
This can be used to slide the carousel(s) to the next item.

**slidePrev()**  
This can be used to slide the carousel(s) to the previous item.

**slideTo(slideNum)**  
This can be called to slide the carousel(s) to a specific item. Slide numbers begin at 0.  
At the moment **loop** changes the slide numbers but this will be remedied in a future version.

**getCurrentSlide()**  
Returns the current slide element.  
This the leftmost (or topmost) element that is fully within the constraints of the carousel container.  
In other words, elements that are partially off the edge of the carousel are excluded.

**getCurrentIndex()**  
Returns the index of the current slide.  
See `getCurrentSlide()` for how this is calculated.

**getNextSlide()**  
Returns the next adjacent slide element.  
See `getCurrentSlide()` for how this is calculated.

**getPrevSlide()**  
Returns the previous adjacent slide element.  
See `getCurrentSlide()` for how this is calculated.

#### Multiple carousels
The methods above will work regarldess as to how many elements `selector` maps to. However, there are times
one may want to call a method on a singular carousel. In this case, one can use one of the methods below
to get the individual carousel and apply said method to that instead.

**getCarousels()**  
If `selector` refers to multiple elements, this method can be used to get all of the individual
slider objects. Then the `slide` methods above can be called on specific carousels. If there is only
one carousel, this is unnecessary.

**getCarousel(index)**  
If `selector` refers to multiple elements, this method can be used to get a singular slider object.
Then the `slide` methods above can be called on it directly. If there is only
one carousel, this is unnecessary.

**carouselCount()**  
This will get the number of carousels instantiated.

### Example
```
var yascl = new YASCL({
	selector: '#page-wrapper .slider',
	time: 600,
	easing: 'swing',
	autoplay: true,
	arrowSelector: '.arrow'
});

yascl.slideTo(2);
```
