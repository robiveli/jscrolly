
;(function() { 

    'use strict';

    var jScrolly = function(options) {

        var defaults = {

            buttonsClass: 'jPanel',
            buttonPrevClass: 'prevBtn',
            buttonNextClass: 'nextBtn',
            buttonPrevText: 'Previous',
            buttonNextText: 'Next',

            onRenderButtons: null,
            onFirstSlide: null,
            onSlide: null

        };

        this.options = options ? extendDefaults(defaults, options) : defaults;

        console.log(this.options);

        this.init();

    };

    function extendDefaults(defaults, options) {

        Object.assign(defaults, options);

        return defaults;
        
    }

    function simpleThrottle(callback, delay = 150) {

        return function () { 

            if (!this.throttled) {

                this.throttled = true;

                clearTimeout(timeoutInit);
                var timeoutInit = setTimeout(function () { 

                    callback.apply(this, arguments);
                    this.throttled = false; 

                }, delay);

            }

        }

    }

    function setPrefix(self) {

        var prefixes = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform'],
            testEl = document.createElement('div');

        prefixes.forEach(function(val) {

            if (testEl.style[val] !== undefined && !self.transformPrefixed) {

                self.transformPrefixed = val;

            }

        });

    }

    jScrolly.prototype = {

        init: function() {

            this.$el = document.getElementsByClassName('jScrolly');
            this.$slider = this.$el[0].getElementsByClassName('slider');
            this.$items = this.$slider[0].childNodes;
            this.itemsNum = this.$items.length;
            this.wraperWidth = this.$el[0].offsetWidth;
            this.initialSliderWidth = this.itemsNum * this.$items[0].offsetWidth;

            setPrefix(this);

            this.setupSlider();
            this.renderButtons();
            this.rebuildListener();

        },

        setupSlider: function() {

            var offsetAll,
                itemsWithOffset;
               
            this.$items.forEach(function(item, index) {

                var style = window.getComputedStyle(item),
                    marginLeft = parseInt(style.marginLeft),
                    marginRight = parseInt(style.marginRight);

                offsetAll = offsetAll ? (offsetAll + marginLeft + marginRight) : (marginLeft + marginRight);
                itemsWithOffset = index;

            });

            var sliderWidth = Number(this.initialSliderWidth + offsetAll),
                stepOffset = offsetAll / itemsWithOffset;

            this.slideStep = this.$items[0].offsetWidth + stepOffset;
            this.maxSlideNext = sliderWidth - this.wraperWidth;
            this.maxSlidePrev = 0;

            this.$slider[0].style.width = sliderWidth + 'px';
            this.$slider[0].style[this.transformPrefixed] = 'translateX(0px)';

        },

        renderButtons: function() {

            var jPanelTemplate = '<div class="' + this.options.buttonsClass + '">\
                <button class="' + this.options.buttonPrevClass + '">' + this.options.buttonPrevText + '</button>\
                <button class="' + this.options.buttonNextClass + '">' + this.options.buttonNextText + '</button>\
            </div>';

            this.$el[0].insertAdjacentHTML('beforeend', jPanelTemplate);

            this.eventsSetup();

            this.options.onRenderButtons && this.options.onRenderButtons(document.getElementsByClassName(this.options.buttonsClass));

        },

        eventsSetup: function() {

            var $nextBtn = document.getElementsByClassName('nextBtn'),
                $prevBtn = document.getElementsByClassName('prevBtn');

            $nextBtn[0].addEventListener('click', () => this.moveNext());
            $prevBtn[0].addEventListener('click', () => this.movePrev());

        },

        moveNext: function() {

            if (this.step > this.maxSlideNext) { return; }

            this.customCallbacks();
            
            this.step = this.step ? (this.step + this.slideStep) : this.slideStep;

            if (this.step < this.maxSlideNext) {
                
                this.maxSlideNext > this.step ? this.animate(this.step) : this.animate(this.maxSlideNext);

            } else { 

                this.animate(this.maxSlideNext);

            }

        },

        movePrev: function() {

            if (this.step !== this.maxSlidePrev) {

                this.step = this.step - this.slideStep;

                this.animate(this.step);

                this.customCallbacks();

            }
            
        },

        animate: function(step) {

            this.$slider[0].style[this.transformPrefixed] = 'translateX(-' + step + 'px)';

        },

        rebuildListener: function() {
            
            window.addEventListener('resize', simpleThrottle(function() {

                this.step = 0;
                this.wraperWidth = this.$el[0].offsetWidth;
                this.initialSliderWidth = this.itemsNum * this.$items[0].offsetWidth;

                this.setupSlider();

            }.bind(this)));

        },

        customCallbacks: function() {

            (this.step == undefined) && this.options.onFirstSlide && this.options.onFirstSlide();

            this.options.onSlide && this.options.onSlide();

        }

    }

    window.jScrolly = jScrolly;

})(); 
