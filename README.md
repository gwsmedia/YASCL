# YASCL - Yet Another Simple Carousel Library
<sup>_Pronounced Yaskel_</sup>  
**Minimalist endless carousel**

There's many great carousel JS libraries out there, but sometimes you just want a super-simple endless carousel which allows for extensive styling.

YASCL is perfect for that. It's about as plug-and-play as you can get.

## Installation
Include in `<head></head>`:
```
<!-- JQuery -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js">

<!-- YASCL JS -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/gwsmedia/yascl/yascl.js">

<!-- YASCL stylesheet -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/gwsmedia/yascl/yascl.css">
```

## Usage
### Basic Usage
```
jQuery(document).ready(function() {
	yascl_initialise({
		selector: '#css-selector-here',
	});
});
```

### Options
**selector** (required)  
This is a CSS selector that will define the slider. All of its direct children will become slider items.
The width of this container should at max be the width of one item less than the total width of all items.
In other words if you have 5 items of width 100px, this container should have a max width of 400px.

**time**  
default: `400`  
A number in miliseconds determining how long for one of the carousel items to make one full movement.

**easing**  
default: `linear`  
The easing method of the animation. Can be `swing` or `linear`.

**autoplay**  
default: `false`  
The carousel will start automatically and continue moving.

**arrowSelector**  
This will define arrows that can be used to control the slider. It should be a CSS class that the left and
right arrows share. The right arrow should also have the class `right`.

### Example
```
jQuery(document).ready(function() {
	yascl_initialise({
		selector: '#css-selector-here',
		time: 200,
		easing: 'swing',
		autoplay: true,
		arrowSelector: '.arrow'
	});
});
```
