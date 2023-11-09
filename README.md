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

Multiple sliders can use the same selector and they will still be considered separate sliders.

**arrowSelector**  
This will define arrows that can be used to control the slider. It should be a CSS class that the left and
right arrows share. The right arrow should also have the class `right`.

**time**  
default: `400`  
A number in miliseconds determining how long for one of the carousel items to make one full movement.

**easing**  
default: `linear`  
The easing method of the animation. Can be `swing` or `linear`.

**autoplay**  
default: `false`  
The carousel will start automatically and continue moving.

**loop**  
default: `false`  
Whether the carousel loops or not. If set to false, the carousel will hide the relevant arrow button once the end of beginning of the slider is reached.

**draggable**  
default: `true`  
Whether the carousel is draggable or not.

**slideToEdge**  
default: `false`  
Whether the slider will slide to the closest edge of the next item or not.  
If _false_, the left edge of the next item will align with the left edge of the slider.  
If _true_, the behaviour will remain the same when moving left, but when moving right the right edge of the next item will align with the right edge of the slider.

**innerSelector**  
This is a CSS selector for an optional inner container if a more complex structure is desired. This means you can use **selector** to define a perimiter
outside of which all slider content is hidden. Then you can use the **innerSelector** to define the inner boundaries of the slider which will be used to 
calculate where the slider should "begin" and "end". This means you can hide the arrows at a certain limit but still show the content overflowing out of 
**innerSelector**. If present, the bullet points defined for **selector** will apply to this container instead.

**localArrows**  
default: `false`  
If true, the **arrowSelector** will only be searched for as a descendent of **selector**. In such a case you will need to have an **innerSelector** defined so the
arrows are not considered slider items. This can be useful if the arrows do not have unique **arrowSelector**s.

### Example
```
new YASCL({
	selector: '#page-wrapper .slider',
	time: 600,
	easing: 'swing',
	autoplay: true,
	arrowSelector: '.arrow'
});
```
