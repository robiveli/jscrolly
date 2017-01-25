!function(){"use strict";function a(a,b){return Object.keys(b).forEach(function(c){a[c]=b[c]}.bind(this)),a}function b(a,b){var b=b||250;return function(){if(!this.throttled){this.throttled=!0,clearTimeout(c);var c=setTimeout(function(){a.apply(this,arguments),this.throttled=!1},b)}}}function c(a){var b=["transform","WebkitTransform","msTransform","MozTransform"],c=document.createElement("div");b.forEach(function(b){void 0===c.style[b]||a.transformPrefixed||(a.transformPrefixed=b)})}var d=function(b){var c={buttonsClass:"jPanel",buttonPrevClass:"prevBtn",buttonNextClass:"nextBtn",buttonPrevText:"Previous",buttonNextText:"Next",onRenderButtons:null,onFirstSlide:null,onSlide:null};this.options=b?a(c,b):c,console.log(this.options),this.init()};d.prototype={init:function(){this.$el=document.getElementsByClassName("jScrolly"),this.$slider=this.$el[0].getElementsByClassName("slider"),this.$items=this.$slider[0].childNodes,this.itemsNum=this.$items.length,this.wraperWidth=this.$el[0].offsetWidth,this.initialSliderWidth=this.itemsNum*this.$items[0].offsetWidth,c(this),this.setupSlider(),this.renderButtons(),this.rebuildListener()},setupSlider:function(){var a,b;this.$items.forEach(function(c,d){var e=window.getComputedStyle(c),f=parseInt(e.marginLeft),g=parseInt(e.marginRight);a=a?a+f+g:f+g,b=d});var c=Number(this.initialSliderWidth+a),d=a/b;this.slideStep=this.$items[0].offsetWidth+d,this.maxSlideNext=c-this.wraperWidth,this.maxSlidePrev=0,this.$slider[0].style.width=c+"px",this.$slider[0].style[this.transformPrefixed]="translateX(0px)"},renderButtons:function(){var a='<div class="'+this.options.buttonsClass+'">                <button class="'+this.options.buttonPrevClass+'">'+this.options.buttonPrevText+'</button>                <button class="'+this.options.buttonNextClass+'">'+this.options.buttonNextText+"</button>            </div>";this.$el[0].insertAdjacentHTML("beforeend",a),this.eventsSetup(),this.options.onRenderButtons&&this.options.onRenderButtons(document.getElementsByClassName(this.options.buttonsClass))},eventsSetup:function(){var a=document.getElementsByClassName("nextBtn"),b=document.getElementsByClassName("prevBtn");a[0].addEventListener("click",this.moveNext.bind(this)),b[0].addEventListener("click",this.movePrev.bind(this))},moveNext:function(){this.step>this.maxSlideNext||(this.customCallbacks(),this.step=this.step?this.step+this.slideStep:this.slideStep,this.step<this.maxSlideNext&&this.maxSlideNext>this.step?this.animate(this.step):this.animate(this.maxSlideNext))},movePrev:function(){this.step!==this.maxSlidePrev&&(this.step=this.step-this.slideStep,this.animate(this.step),this.customCallbacks())},animate:function(a){this.$slider[0].style[this.transformPrefixed]="translateX(-"+a+"px)"},rebuildListener:function(){window.addEventListener("resize",b(function(){this.step=0,this.wraperWidth=this.$el[0].offsetWidth,this.initialSliderWidth=this.itemsNum*this.$items[0].offsetWidth,this.setupSlider()}.bind(this)))},customCallbacks:function(){void 0==this.step&&this.options.onFirstSlide&&this.options.onFirstSlide(),this.options.onSlide&&this.options.onSlide()}},window.jScrolly=d}();