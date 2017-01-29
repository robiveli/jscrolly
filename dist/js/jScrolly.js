"use strict";!function(){var a=function(a,b){return Object.assign(a,b),a},b=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;return function(){if(!this.throttled){this.throttled=!0,clearTimeout(c);var c=setTimeout(function(){a.apply(this,arguments),this.throttled=!1},b)}}},c=function(a){var b=["transform","WebkitTransform","msTransform","MozTransform"],c=document.createElement("div");b.forEach(function(b){void 0===c.style[b]||a.transformPrefixed||(a.transformPrefixed=b)})},d=function(b){var c={buttonsClass:"jPanel",buttonPrevClass:"prevBtn",buttonNextClass:"nextBtn",buttonPrevText:"Previous",buttonNextText:"Next",onRenderButtons:null,onFirstSlide:null,onSlide:null};this.options=b?a(c,b):c,this.init()};d.prototype={init:function(){this.$el=document.getElementsByClassName("jScrolly"),this.$slider=this.$el[0].getElementsByClassName("slider"),this.$items=this.$slider[0].childNodes,this.itemsNum=this.$items.length,c(this),this.setupSlider(),this.renderButtons(),this.rebuildListener()},setupSlider:function(){var a,b;this.$items.forEach(function(c,d){var e=window.getComputedStyle(c),f=parseInt(e.marginLeft),g=parseInt(e.marginRight);a=a?a+f+g:f+g,b=d});var c=Number(this.itemsNum*this.$items[0].offsetWidth+a),d=a/b;this.slideStep=this.$items[0].offsetWidth+d,this.maxSlideNext=c-this.$el[0].offsetWidth,this.maxSlidePrev=0,this.$slider[0].style.width=c+"px",this.$slider[0].style[this.transformPrefixed]="translateX(0px)"},renderButtons:function(){var a='<div class="'+this.options.buttonsClass+'">                <button class="'+this.options.buttonPrevClass+'">'+this.options.buttonPrevText+'</button>                <button class="'+this.options.buttonNextClass+'">'+this.options.buttonNextText+"</button>            </div>";this.$el[0].insertAdjacentHTML("beforeend",a),this.eventsSetup(),this.options.onRenderButtons&&this.options.onRenderButtons(this.$el[0].getElementsByClassName(this.options.buttonsClass))},eventsSetup:function(){var a=this,b=this.$el[0].getElementsByClassName("nextBtn"),c=this.$el[0].getElementsByClassName("prevBtn");b[0].addEventListener("click",function(){return a.moveNext()}),c[0].addEventListener("click",function(){return a.movePrev()})},moveNext:function(){this.step>this.maxSlideNext||(this.customCallbacks(),this.step=this.step?this.step+this.slideStep:this.slideStep,this.step<this.maxSlideNext&&this.maxSlideNext>this.step?this.animate(this.step):this.animate(this.maxSlideNext))},movePrev:function(){this.step!==this.maxSlidePrev&&(this.step=this.step-this.slideStep,this.animate(this.step),this.customCallbacks())},animate:function(a){this.$slider[0].style[this.transformPrefixed]="translateX(-"+a+"px)"},rebuildListener:function(){var a=this,c=this.$el[0].getElementsByClassName("jContent")[0];window.addEventListener("resize",b(function(){c.scrollLeft=0,a.step=0,a.setupSlider()}))},customCallbacks:function(){void 0==this.step&&this.options.onFirstSlide&&this.options.onFirstSlide(),this.options.onSlide&&this.options.onSlide()},destroy:function(){this.$el[0].getElementsByClassName("jPanel")[0].remove(),this.$slider[0].style="",delete this.options}},window.jScrolly=d}();