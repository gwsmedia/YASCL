var YASCL;(()=>{"use strict";var t={588:(t,e,r)=>{r.d(e,{Z:()=>a});var i=r(81),n=r.n(i),s=r(645),o=r.n(s)()(n());o.push([t.id,".yascl {\n  overflow: hidden;\n}\n\n.yascl-wrapper {\n  display: inline-flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  overflow: visible;\n  position: relative;\n}\n\n/* If parent and wrapper are the same, override default wrapper overflow */\n.yascl.yascl-wrapper {\n  overflow: hidden;\n}\n",""]);const a=o},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",i=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),i&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),i&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,i,n,s){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var p=this[a][0];null!=p&&(o[p]=!0)}for(var l=0;l<t.length;l++){var h=[].concat(t[l]);i&&o[h[0]]||(void 0!==s&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=s),r&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=r):h[2]=r),n&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=n):h[4]="".concat(n)),e.push(h))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function r(t){for(var r=-1,i=0;i<e.length;i++)if(e[i].identifier===t){r=i;break}return r}function i(t,i){for(var s={},o=[],a=0;a<t.length;a++){var p=t[a],l=i.base?p[0]+i.base:p[0],h=s[l]||0,c="".concat(l," ").concat(h);s[l]=h+1;var u=r(c),d={css:p[1],media:p[2],sourceMap:p[3],supports:p[4],layer:p[5]};if(-1!==u)e[u].references++,e[u].updater(d);else{var f=n(d,i);i.byIndex=a,e.splice(a,0,{identifier:c,updater:f,references:1})}o.push(c)}return o}function n(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,n){var s=i(t=t||[],n=n||{});return function(t){t=t||[];for(var o=0;o<s.length;o++){var a=r(s[o]);e[a].references--}for(var p=i(t,n),l=0;l<s.length;l++){var h=r(s[l]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}s=p}}},569:t=>{var e={};t.exports=function(t,r){var i=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,r)=>{t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var i="";r.supports&&(i+="@supports (".concat(r.supports,") {")),r.media&&(i+="@media ".concat(r.media," {"));var n=void 0!==r.layer;n&&(i+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),i+=r.css,n&&(i+="}"),r.media&&(i+="}"),r.supports&&(i+="}");var s=r.sourceMap;s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function r(i){var n=e[i];if(void 0!==n)return n.exports;var s=e[i]={id:i,exports:{}};return t[i](s,s.exports,r),s.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nc=void 0;var i={};(()=>{r.d(i,{default:()=>x});var t=r(379),e=r.n(t),n=r(795),s=r.n(n),o=r(569),a=r.n(o),p=r(565),l=r.n(p),h=r(216),c=r.n(h),u=r(589),d=r.n(u),f=r(588),v={};v.styleTagTransform=d(),v.setAttributes=l(),v.insert=a().bind(null,"head"),v.domAPI=s(),v.insertStyleElement=c(),e()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals;const g=jQuery;var m=r.n(g);class w{constructor(t,e){this.wrapper=t,this.inner=e,this.x=0,this.mouseX=0,this.startMouseX=0,this.moving=!1}addEvents(t,e){this.wrapper.on("mousedown",(e=>{this.moving=!0,this.startX=t(),this.startMouseX=e.clientX})),document.addEventListener("mouseup",(t=>{this.moving=!1})),document.addEventListener("mousemove",(t=>{if(t.preventDefault(),this.moving){this.x=this.startX+this.startMouseX-t.clientX;const r=this.wrapper.outerWidth()-this.inner.outerWidth();this.x<0?this.x=0:this.x>r&&(this.x=r),jQuery(this.wrapper).css("right",this.x+"px"),e()}}))}}class y{static pixelsToInt(t){return parseInt(t.replace("px",""))}}class x{constructor(t){this.options=t,null!=this.options.skipDomReady&&this.options.skipDomReady?this.initialise():m()((()=>{this.initialise()}))}initialise(){this.parent=m()(this.options.selector),0===this.parent.length||this.parent.hasClass("yascl")||(this.parent.length>1?this.initialiseMultiple():this.initialiseSingle())}initialiseMultiple(){let t=this.options;t.selector+=".processing",t.skipDomReady=!0,this.parent.each((function(){m()(this).addClass("processing"),new x(t),m()(this).removeClass("processing")}))}initialiseSingle(){this.wrapChildren(),this.wrapper.css("right","0px"),this.options.arrowSelector&&this.setArrowEvents(),(null==this.options.draggable||this.options.draggable)&&(this.dragHelper=new w(this.wrapper,this.inner),this.dragHelper.addEvents((()=>this.getCurrentPos()),(()=>{this.checkBoundaries()}))),(this.options.loop||this.checkBoundaries())&&this.options.autoplay&&(this.wrapper.addClass("autoplay"),this.animate("left"))}wrapChildren(){this.parent.addClass("yascl"),this.options.innerSelector&&(this.inner=this.parent.find(this.options.innerSelector)),null!=this.inner&&0!==this.inner.length||(this.inner=this.parent),this.inner.children().wrapAll('<div class="yascl-wrapper"></div>'),this.wrapper=this.inner.children(".yascl-wrapper")}animate(t){if(this.wrapper.hasClass("animating"))return;this.wrapper.addClass("animating");const e=this.options.loop||!1;e&&this.moveLoopedItem(t,"pre-animation");const r=this.options.easing||"linear",i=this.getCurrentPos()+this.getMovementDistance(t);this.wrapper.animate({right:i},this.options.time,r,(()=>{this.wrapper.find(":animated").length>0||(this.wrapper.removeClass("animating"),e&&this.moveLoopedItem(t,"post-animation"),(e||this.checkBoundaries())&&this.wrapper.hasClass("autoplay")&&this.animate(t))}))}getCurrentPos(){return y.pixelsToInt(this.wrapper.css("right"))}getMovementDistance(t){const e=this.options.slideToEdge||!1,r=this.inner.offset().left+y.pixelsToInt(this.inner.css("padding-left"));let i,n,s,o=0,a=this.wrapper.children();"left"===t?(i=0,n=a.length,s=1):(i=a.length-1,n=0,s=-1);for(let p=i;"left"==t?p<n:p>=n;p+=s){let i=m()(a[p]),n=i.offset().left;if("left"==t){if(n>r){o=n-r;break}}else if("right"==t){const t=r+this.inner.outerWidth(),s=n+i.outerWidth();if(e&&s<t){o=s-t;break}if(!e&&n<r){o=n-r;break}}}const p=this.getBoundaryOverstep(t);return Math.abs(o)>Math.abs(p)&&(o=p),o}moveLoopedItem(t,e){const r="left"===t?0:-1,i=this.wrapper.children().eq(r);if("left"===t&&"post-animation"===e)i.appendTo(this.wrapper),this.wrapper.css("right","0px");else if("right"==t&&"pre-animation"===e){i.prependTo(this.wrapper);const t=i.outerWidth(!0);this.wrapper.css("right",t)}}setArrowEvents(){null!=this.options.localArrows&&this.options.localArrows?this.arrows=this.parent.find(this.options.arrowSelector):this.arrows=m()(this.options.arrowSelector),this.arrows.click((t=>{const e=m()(t.currentTarget).hasClass("right")?"left":"right";this.wrapper.removeClass("autoplay"),this.animate(e)}))}getBoundaryOverstep(t,e=!1){const r=this.wrapper.children(),i="left"==t?r.last():r.first(),n=this.inner.offset().left+y.pixelsToInt(this.inner.css("padding-left")),s=i.offset().left;if("left"==t){const t=n+this.inner.outerWidth(),r=s+i.outerWidth();return e?r>t:r-t}if("right"==t)return e?s<n:s-n}checkBoundary(t){const e="left"===t?"right":"left",r=this.getBoundaryOverstep(e,!0);return this.toggleArrow(t,r),r}checkBoundaries(){const t=this.checkBoundary("left"),e=this.checkBoundary("right");return t||e}toggleArrow(t,e=!0){if(null==this.arrows)return;let r;r="right"==t?this.arrows.filter(".right"):this.arrows.not(".right"),r.toggle(e)}}})(),YASCL=i.default})();