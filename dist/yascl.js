var YASCL;(()=>{"use strict";var t={588:(t,e,r)=>{r.d(e,{Z:()=>s});var n=r(81),i=r.n(n),a=r(645),o=r.n(a)()(i());o.push([t.id,".yascl {\n  overflow: hidden;\n}\n\n.yascl-wrapper {\n  display: inline-flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  overflow: visible;\n}\n\n/* If parent and wrapper are the same, override default wrapper overflow */\n.yascl.yascl-wrapper {\n  overflow: hidden;\n}\n\n.yascl-wrapper > * {\n  width: auto;\n  position: relative;\n}\n",""]);const s=o},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",n=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),n&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),n&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,n,i,a){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(n)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(o[c]=!0)}for(var p=0;p<t.length;p++){var l=[].concat(t[p]);n&&o[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),r&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=r):l[2]=r),i&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=i):l[4]="".concat(i)),e.push(l))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function r(t){for(var r=-1,n=0;n<e.length;n++)if(e[n].identifier===t){r=n;break}return r}function n(t,n){for(var a={},o=[],s=0;s<t.length;s++){var c=t[s],p=n.base?c[0]+n.base:c[0],l=a[p]||0,u="".concat(p," ").concat(l);a[p]=l+1;var h=r(u),d={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)e[h].references++,e[h].updater(d);else{var f=i(d,n);n.byIndex=s,e.splice(s,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function i(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,i){var a=n(t=t||[],i=i||{});return function(t){t=t||[];for(var o=0;o<a.length;o++){var s=r(a[o]);e[s].references--}for(var c=n(t,i),p=0;p<a.length;p++){var l=r(a[p]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=c}}},569:t=>{var e={};t.exports=function(t,r){var n=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,r)=>{t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var i=void 0!==r.layer;i&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,i&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(n,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var a=e[n]={id:n,exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nc=void 0;var n={};(()=>{r.d(n,{default:()=>g});var t=r(379),e=r.n(t),i=r(795),a=r.n(i),o=r(569),s=r.n(o),c=r(565),p=r.n(c),l=r(216),u=r.n(l),h=r(589),d=r.n(h),f=r(588),v={};v.styleTagTransform=d(),v.setAttributes=p(),v.insert=s().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=u(),e()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals;const m=jQuery;var y=r.n(m);class g{constructor(t){this.options=t,y()((()=>{if(this.parent=y()(this.options.selector),0===this.parent.length||this.parent.hasClass("yascl"))return;this.parent.addClass("yascl"),this.options.innerSelector&&(this.inner=this.parent.find(this.options.innerSelector)),null!=this.inner&&0!==this.inner.length||(this.inner=this.parent),this.inner.children().wrapAll('<div class="yascl-wrapper"></div>'),this.wrapper=this.inner.children(".yascl-wrapper");const t=this.checkVirtualBoundaries(!0);this.options.arrowSelector&&this.setArrowEvents(),t&&this.options.autoplay&&(this.wrapper.addClass("autoplay"),this.animate("left"))}))}animate(t){if(this.wrapper.hasClass("animating"))return;this.wrapper.addClass("animating");const e=this.options.easing||"linear",r=null===this.options.loop||this.options.loop,n=this.moveItem(t,r,"pre-animation");this.wrapper.children().animate({right:n},this.options.time,e,(()=>{if(this.wrapper.find(":animated").length>0)return;this.moveItem(t,r,"post-animation");const e=!r&&this.checkVirtualBoundaries();this.wrapper.removeClass("animating"),!e&&this.wrapper.hasClass("autoplay")&&this.animate(t)}))}moveItem(t,e,r){const n="left"===t?0:-1,i=this.wrapper.children(),a=i.eq(n),o=parseInt(a.css("right").replace("px","")),s=a.outerWidth(!0);return"left"===t?e&&"post-animation"===r?(a.appendTo(this.wrapper),i.css("right","0px"),s):o+s:e&&"pre-animation"===r?(a.prependTo(this.wrapper),i.css("right",s),"0px"):o-s}setArrowEvents(){y()(this.options.arrowSelector).click((t=>{const e=y()(t.currentTarget).hasClass("right")?"left":"right";this.wrapper.removeClass("autoplay"),this.animate(e)}))}getBoundaryOverstep(t){const e=this.wrapper.children(),r="left"==t?e.last():e.first(),n=r.offset().left,i=r.outerWidth(),a=n+i,o=this.inner.offset().left,s=o+this.inner.outerWidth();return("left"===t?a-s:o-n)/i}checkVirtualBoundary(t){const e=this.getBoundaryOverstep(t)<=(this.options.overstepThreshold||.1);return this.toggleArrow("left"===t?"right":"left",!e),e}checkVirtualBoundaries(t=!1){const e=this.checkVirtualBoundary("left"),r=this.checkVirtualBoundary("right");return t?!e||!e:e||r}toggleArrow(t,e=!0){if(null==this.options.arrowSelector)return;let r,n=y()(this.options.arrowSelector);r="right"==t?n.filter(".right"):n.not(".right"),r.toggle(e)}}})(),YASCL=n.default})();