!function(){"use strict";function a(a,b){return Object.keys(b).forEach(function(c){a[c]=b[c]}.bind(this)),a}function b(a,b){var b=b||250;return function(){if(!this.throttled){this.throttled=!0,clearTimeout(c);var c=setTimeout(function(){a.apply(this,arguments),this.throttled=!1},b)}}}var c=function(b){var c={buttonsClass:"jPanel",buttonPrevClass:"prevBtn",buttonNextClass:"nextBtn",buttonPrevText:"Previous",buttoNextText:"Next",onFirstSlide:null,onSlide:null};this.options=b?a(c,b):c,console.log(this.options),this.init()};c.prototype={init:function(){this.$el=document.getElementsByClassName("jScrolly"),this.$slider=this.$el[0].getElementsByClassName("slider"),this.$items=this.$slider[0].childNodes,this.itemsNum=this.$items.length,this.wraperWidth=this.$el[0].offsetWidth,this.initialSliderWidth=this.itemsNum*this.$items[0].offsetWidth,this.setupSlider(),this.renderArrows(),this.rebuildListener()},setupSlider:function(){var a,b;this.$items.forEach(function(c,d){var e=window.getComputedStyle(c),f=parseInt(e.marginLeft),g=parseInt(e.marginRight);a=a?a+f+g:f+g,b=d}),this.sliderWidth=Number(this.initialSliderWidth+a),this.stepOffset=a/b,this.offsetAll=a,this.slideStep=this.$items[0].offsetWidth+this.stepOffset,this.maxSlideNext=this.sliderWidth-this.wraperWidth,this.maxSlidePrev=0,this.$slider[0].style.width=this.sliderWidth+"px",this.$slider[0].style.transform="translateX(0px)"},renderArrows:function(){var a='<div class="'+this.options.buttonsClass+'">                <button class="'+this.options.buttonPrevClass+'">'+this.options.buttonPrevText+'</button>                <button class="'+this.options.buttonNextClass+'">'+this.options.buttonNextText+"</button>            </div>";this.$el[0].insertAdjacentHTML("beforeend",a),this.eventsSetup()},eventsSetup:function(){this.$nextBtn=document.getElementsByClassName("nextBtn"),this.$prevBtn=document.getElementsByClassName("prevBtn"),this.$nextBtn[0].addEventListener("click",this.moveNext.bind(this)),this.$prevBtn[0].addEventListener("click",this.movePrev.bind(this))},moveNext:function(){this.step>this.maxSlideNext||(this.customCallbacks(),this.step=this.step?this.step+this.slideStep:this.slideStep,this.step<this.maxSlideNext&&this.maxSlideNext>this.step?this.animate(this.step):this.animate(this.maxSlideNext))},movePrev:function(){this.step!==this.maxSlidePrev&&(this.step=this.step-this.slideStep,this.animate(this.step),this.customCallbacks())},animate:function(a){this.$slider[0].style.transform="translateX(-"+a+"px)"},rebuildListener:function(){window.addEventListener("resize",b(function(){this.step=0,this.wraperWidth=this.$el[0].offsetWidth,this.initialSliderWidth=this.itemsNum*this.$items[0].offsetWidth,this.setupSlider()}.bind(this)))},customCallbacks:function(){void 0==this.step&&this.options.onFirstSlide&&this.options.onFirstSlide(),this.options.onSlide&&this.options.onSlide()}},window.jScrolly=c}();