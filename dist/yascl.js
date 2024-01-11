var YASCL;(()=>{"use strict";var t={588:(t,e,i)=>{i.d(e,{Z:()=>a});var s=i(81),r=i.n(s),n=i(645),o=i.n(n)()(r());o.push([t.id,".yascl {\n  overflow: hidden;\n}\n\n.yascl-wrapper {\n  display: inline-flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  overflow: visible;\n  position: relative;\n}\n\n/* If parent and wrapper are the same, override default wrapper overflow */\n.yascl.yascl-wrapper {\n  overflow: hidden;\n}\n\n.yascl-wrapper.vertical {\n    flex-direction: column;\n}\n",""]);const a=o},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i="",s=void 0!==e[5];return e[4]&&(i+="@supports (".concat(e[4],") {")),e[2]&&(i+="@media ".concat(e[2]," {")),s&&(i+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),i+=t(e),s&&(i+="}"),e[2]&&(i+="}"),e[4]&&(i+="}"),i})).join("")},e.i=function(t,i,s,r,n){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var h=this[a][0];null!=h&&(o[h]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);s&&o[d[0]]||(void 0!==n&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=n),i&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=i):d[2]=i),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),e.push(d))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function i(t){for(var i=-1,s=0;s<e.length;s++)if(e[s].identifier===t){i=s;break}return i}function s(t,s){for(var n={},o=[],a=0;a<t.length;a++){var h=t[a],l=s.base?h[0]+s.base:h[0],d=n[l]||0,c="".concat(l," ").concat(d);n[l]=d+1;var p=i(c),u={css:h[1],media:h[2],sourceMap:h[3],supports:h[4],layer:h[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var S=r(u,s);s.byIndex=a,e.splice(a,0,{identifier:c,updater:S,references:1})}o.push(c)}return o}function r(t,e){var i=e.domAPI(e);return i.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;i.update(t=e)}else i.remove()}}t.exports=function(t,r){var n=s(t=t||[],r=r||{});return function(t){t=t||[];for(var o=0;o<n.length;o++){var a=i(n[o]);e[a].references--}for(var h=s(t,r),l=0;l<n.length;l++){var d=i(n[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}n=h}}},569:t=>{var e={};t.exports=function(t,i){var s=function(t){if(void 0===e[t]){var i=document.querySelector(t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(i)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,i)=>{t.exports=function(t){var e=i.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(i){!function(t,e,i){var s="";i.supports&&(s+="@supports (".concat(i.supports,") {")),i.media&&(s+="@media ".concat(i.media," {"));var r=void 0!==i.layer;r&&(s+="@layer".concat(i.layer.length>0?" ".concat(i.layer):""," {")),s+=i.css,r&&(s+="}"),i.media&&(s+="}"),i.supports&&(s+="}");var n=i.sourceMap;n&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,i)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var n=e[s]={id:s,exports:{}};return t[s](n,n.exports,i),n.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.nc=void 0;var s={};(()=>{i.d(s,{default:()=>w});var t=i(379),e=i.n(t),r=i(795),n=i.n(r),o=i(569),a=i.n(o),h=i(565),l=i.n(h),d=i(216),c=i.n(d),p=i(589),u=i.n(p),S=i(588),g={};g.styleTagTransform=u(),g.setAttributes=l(),g.insert=a().bind(null,"head"),g.domAPI=n(),g.insertStyleElement=c(),e()(S.Z,g),S.Z&&S.Z.locals&&S.Z.locals;const A=jQuery;var f=i.n(A);const v={time:400,delay:5e3,easing:"linear",autoplay:!1,reverse:!1,loop:!1,draggable:!0,vertical:!1,slideToEdge:!1,localArrows:!1};class I{constructor(t){this.options={...v,...t},Object.keys(this.options).forEach((t=>{Object.defineProperty(this,t,{get:function(){return this.get(t)}})}))}getAll(){return this.options}get(t){return this.options.hasOwnProperty(t)?this.options[t]:null}}class T{constructor(t,e,i,s,r,n){this.wrapper=t,this.inner=e,this.vertical=i,this.getCurrentPos=s,this.updateArrowVisibility=r,this.cancelSliding=n,this.pos=0,this.mousePos=0,this.startMousePos=0,this.movedPos=0,this.moving=!1,this.clickedLink=!1}getClientPos(t){let e;return e=["touchstart","touchmove","touchend"].includes(t.type)?t.touches[0]:t,this.vertical?t.clientY:t.clientX}dragStart(t){this.cancelSliding(),this.moving=!0,this.movedPos=0,this.startPos=this.getCurrentPos(),this.startMousePos=this.getClientPos(t)}dragEnd(t){this.moving=!1}dragMove(t){if("mousemove"==t.type&&t.preventDefault(),!this.moving)return;this.movedPos=this.startMousePos-this.getClientPos(t),this.pos=this.startPos+this.movedPos;const e=(this.vertical?this.wrapper.outerHeight():this.wrapper.outerWidth())-(this.vertical?this.inner.outerHeight():this.inner.outerWidth());this.pos<0?this.pos=0:this.pos>e&&(this.pos=e),jQuery(this.wrapper).css(this.vertical?"bottom":"right",this.pos+"px"),this.updateArrowVisibility()}addEvents(){this.wrapper.children().click((t=>{if(t.preventDefault(),!this.moving&&Math.abs(this.movedPos)<2){let e=jQuery(t.target).closest("a").attr("href");null!=e&&(location.href=e)}})),this.wrapper.on("mousedown",this.dragStart.bind(this)),this.wrapper.on("touchstart",this.dragStart.bind(this)),document.addEventListener("mouseup",this.dragEnd.bind(this)),document.addEventListener("touchend",this.dragEnd.bind(this)),document.addEventListener("mousemove",this.dragMove.bind(this)),document.addEventListener("touchmove",this.dragMove.bind(this))}}class C{static pixelsToInt(t){return Math.floor(10*t.replace("px",""))/10}}class R{static get SIDE_TOP(){return"top"}static get SIDE_LEFT(){return"left"}static get SIDE_RIGHT(){return"right"}static get SIDE_BOTTOM(){return"bottom"}static getSidePos(t,e,i=!0,s=!1,r=null){let n;if(r)n=r;else{let i;i=e===R.SIDE_RIGHT?R.SIDE_LEFT:e===R.SIDE_BOTTOM?R.SIDE_TOP:e,n=t.offset()[i]}switch(e){case R.SIDE_TOP:case R.SIDE_LEFT:i?s&&(n-=C.pixelsToInt(t.css("margin-"+e))):n+=R.getBorderWidth(t,e)+C.pixelsToInt(t.css("padding-"+e));break;case R.SIDE_RIGHT:case R.SIDE_BOTTOM:n+=R.getSize(t,e==R.SIDE_BOTTOM,i,s);break;default:return}return Math.round(n)}static getSize(t,e,i=!0,s=!1){let r,n;if("border-box"==t.css("box-sizing")){const i=e?R.SIDE_TOP:R.SIDE_LEFT,s=e?R.SIDE_BOTTOM:R.SIDE_RIGHT;n=R.getBorderWidth(t,i)+R.getBorderWidth(t,s)}else n=0;return r=e?i?t.outerHeight(s):t.height()+n:i?t.outerWidth(s):t.width()+n,Math.round(r)}static getBorderWidth(t,e){return C.pixelsToInt(t.css("border-"+e+"-width"))}}class E{static get DIRECTION_FORWARDS(){return 0}static get DIRECTION_BACKWARDS(){return 1}static get DIRECTION_UNKNOWN(){return 2}static get STATE_PRE_ANIMATION(){return 0}static get STATE_POST_ANIMATION(){return 1}static get CLASS_PARENT(){return"yascl"}static get CLASS_WRAPPER(){return"yascl-wrapper"}static get CLASS_PROCESSING(){return"processing"}static get CLASS_ANIMATING(){return"animating"}static get CLASS_VERTICAL(){return"vertical"}static get CLASS_AUTOPLAY(){return"autoplay"}static get CLASS_PREV_ARROW(){return"prev"}constructor(t,e){this.parent=t,this.options=new I(e),this.options.skipDomReady?this.initialise():jQuery(window).on("load",(()=>{this.initialise()}))}initialise(){if(0===this.parent.length||this.parent.hasClass(E.CLASS_PARENT))return;this.wrapChildren(),this.options.vertical?(this.startSide=R.SIDE_TOP,this.endSide=R.SIDE_BOTTOM,this.wrapper.addClass(E.CLASS_VERTICAL)):(this.startSide=R.SIDE_LEFT,this.endSide=R.SIDE_RIGHT);const t=R.getSize(this.inner,this.options.vertical,!1,!1),e=R.getSize(this.wrapper,this.options.vertical,!0,!0);this.wrapper.css(this.endSide,this.options.reverse?e-t:"0px"),this.options.arrowSelector&&(this.prepareArrows(),this.setArrowEvents()),this.updateArrowVisibility(),this.options.draggable&&(this.dragHelper=new T(this.wrapper,this.inner,this.options.vertical,(()=>this.getCurrentPos()),(()=>{this.updateArrowVisibility()}),(()=>{this.cancelSliding()})),this.dragHelper.addEvents()),this.options.autoplay&&(this.wrapper.addClass(E.CLASS_AUTOPLAY),this.slide(this.options.reverse?E.DIRECTION_FORWARDS:E.DIRECTION_BACKWARDS,this.options.delay))}wrapChildren(){this.parent.addClass(E.CLASS_PARENT),this.options.innerSelector&&(this.inner=this.parent.find(this.options.innerSelector)),null!=this.inner&&0!==this.inner.length||(this.inner=this.parent),this.inner.children().wrapAll('<div class="'+E.CLASS_WRAPPER+'"></div>'),this.wrapper=this.inner.children("."+E.CLASS_WRAPPER)}slide(t,e=0,i=null){setTimeout((()=>{if(this.wrapper.hasClass(E.CLASS_ANIMATING))return;this.wrapper.addClass(E.CLASS_ANIMATING),this.options.loop&&this.moveLoopedItem(t,E.STATE_PRE_ANIMATION);const e=this.getCurrentPos()+this.getMovementDistance(t,i);this.wrapper.animate({[this.endSide]:e},this.options.time,this.options.easing,(()=>{this.wrapper.removeClass(E.CLASS_ANIMATING),this.options.loop&&this.moveLoopedItem(t,E.STATE_POST_ANIMATION),this.updateArrowVisibility();const e=this.boundaryCrossed(t==E.DIRECTION_FORWARDS?this.startSide:this.endSide);(this.options.loop||e)&&this.wrapper.hasClass(E.CLASS_AUTOPLAY)&&this.slide(t,this.options.delay)}))}),e)}slideNext(){this.cancelSliding(),this.slide(E.DIRECTION_BACKWARDS)}slidePrev(){this.cancelSliding(),this.slide(E.DIRECTION_FORWARDS)}slideTo(t){t<0||t>this.wrapper.children().length||(this.cancelSliding(),this.slide(E.DIRECTION_UNKNOWN,0,t))}cancelSliding(){this.wrapper.removeClass(E.CLASS_AUTOPLAY+" "+E.CLASS_ANIMATING)}getCurrentPos(){return C.pixelsToInt(this.wrapper.css(this.endSide))}getMovementDistance(t,e=null){const i=R.getSidePos(this.inner,this.startSide,!1);let s,r,n,o=0,a=this.wrapper.children();null!=e?(s=e,r=e+1,n=1):t===E.DIRECTION_BACKWARDS?(s=0,r=a.length,n=1):(s=a.length-1,r=0,n=-1);for(let h=s;null!=e||t===E.DIRECTION_BACKWARDS?h<r:h>=r;h+=n){const e=jQuery(a[h]),s=R.getSidePos(e,this.startSide,!0,!0);if(t!==E.DIRECTION_FORWARDS&&s>i){o=s-i,t===E.DIRECTION_UNKNOWN&&(t=E.DIRECTION_BACKWARDS);break}if(t!==E.DIRECTION_BACKWARDS){const r=R.getSidePos(this.inner,this.endSide,!1,!1,i),n=R.getSidePos(e,this.endSide,!0,!0,s);if(this.options.slideToEdge&&n<r){o=n-r,t===E.DIRECTION_UNKNOWN&&(t=E.DIRECTION_FORWARDS);break}if(!this.options.slideToEdge&&s<i){o=s-i,t===E.DIRECTION_UNKNOWN&&(t=E.DIRECTION_FORWARDS);break}}}const h=this.getBoundaryOverstep(t===E.DIRECTION_FORWARDS?this.startSide:this.endSide);return Math.abs(o)>Math.abs(h)&&(o=h),o}moveLoopedItem(t,e){const i=t===E.DIRECTION_BACKWARDS?0:-1,s=this.wrapper.children().eq(i);if(t===E.DIRECTION_BACKWARDS&&e===E.STATE_POST_ANIMATION)s.appendTo(this.wrapper),this.wrapper.css(this.endSide,"0px");else if(t===E.DIRECTION_FORWARDS&&e===E.STATE_PRE_ANIMATION){s.prependTo(this.wrapper);const t=R.getSize(s,this.options.vertical,!0,!0);this.wrapper.css(this.endSide,t)}}prepareArrows(){this.options.localArrows?this.arrows=this.parent.find(this.options.arrowSelector):this.arrows=jQuery(this.options.arrowSelector)}setArrowEvents(){this.arrows.click((t=>{let e;e=this.arrows.filter(".right").length>0?jQuery(t.currentTarget).hasClass("right")?E.DIRECTION_BACKWARDS:E.DIRECTION_FORWARDS:jQuery(t.currentTarget).hasClass(E.CLASS_PREV_ARROW)?E.DIRECTION_FORWARDS:E.DIRECTION_BACKWARDS,this.wrapper.removeClass(E.CLASS_AUTOPLAY),this.slide(e)}))}getBoundaryOverstep(t,e=!1){const i=this.wrapper.children(),s=t==this.startSide?i.first():i.last(),r=R.getSidePos(this.inner,this.startSide,!1),n=R.getSidePos(s,this.startSide,!0,!0);if(t==this.startSide)return e?n<r:n-r;if(t==this.endSide){const t=R.getSidePos(this.inner,this.endSide,!1,!1,r),i=R.getSidePos(s,this.endSide,!0,!0,n);return e?i>t:i-t}}boundaryCrossed(t){return this.getBoundaryOverstep(t,!0)}updateArrowVisibility(){this.toggleArrow(this.startSide,this.options.loop||this.boundaryCrossed(this.startSide)),this.toggleArrow(this.endSide,this.options.loop||this.boundaryCrossed(this.endSide))}toggleArrow(t,e=!0){if(null==this.arrows)return;let i,s=this.arrows.filter(".right");if(s.length>0)return i=t==this.startSide?this.arrows.not(".right"):s,void i.toggle(e);i=t==this.startSide?this.arrows.filter("."+E.CLASS_PREV_ARROW):this.arrows.not("."+E.CLASS_PREV_ARROW),i.toggle(e)}}class w{constructor(t){let e=[];return t.selector&&"string"==typeof t.selector?(f()(t.selector).each((function(){e.push(new E(f()(this),t))})),this.carousels=e,new Proxy(this,{get:(t,e,i)=>function(...s){for(let r=0,n=t.carousels.length;r<n;r++){let n=t.carousels[r];if(!(n[e]instanceof Function))return Reflect.get(t,e,i);Reflect.apply(n[e],n,s)}}})):(console.error("A valid CSS selector is required to initialise the carousel."),null)}}})(),YASCL=s.default})();