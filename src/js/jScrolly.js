{ 

    'use strict';

    let jScrolly = function(options) {

        var defaults = {

            buttonsClass: 'jPanel',
            buttonPrevClass: 'prevBtn',
            buttonNextClass: 'nextBtn',
            buttonNeactiveClass: 'neactive',
            buttonPrevText: 'Previous',
            buttonNextText: 'Next',

            onRenderButtons: null,
            onFirstSlide: null,
            onSlide: null

        };

        this.options = options ? extendDefaults(defaults, options) : defaults;

        setPolyfill();

        this.init();

    };

    function setPolyfill() {

        if (typeof NodeList.prototype.forEach !== 'function') {

            NodeList.prototype.forEach = Array.prototype.forEach;

        }

    }

    function extendDefaults(defaults, options) {

        Object.keys(options).forEach((keys) => {

            defaults[keys] = options[keys];

        });

        return defaults;
        
    }

    function simpleThrottle(callback, delay = 200) {

        return function() { 

            if (!this.throttled) {

                this.throttled = true;

                clearTimeout(timeoutInit);
                var timeoutInit = setTimeout(() => { 

                    callback.apply(this, arguments);
                    this.throttled = false; 

                }, delay);

            }

        }

    }

    function setPrefix(self) {

        var prefixes = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform'],
            testEl = document.createElement('div');

        prefixes.forEach((val) => {

            if (testEl.style[val] !== undefined && !self.transformPrefixed) {

                self.transformPrefixed = val;

            }

        });

    }

    function hasClass(el, className) {

        if (el.classList) {

            return el.classList.contains(className);

        } else {

            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

        }

    }

    jScrolly.prototype = {

        init() {

            this.$el = document.getElementsByClassName('jScrolly');
            this.$slider = this.$el[0].getElementsByClassName('slider');
            this.$items = this.$slider[0].childNodes;
            this.itemsNum = this.$items.length;

            setPrefix(this);

            this.setupSlider();
            this.renderButtons();
            this.rebuildListener();

        },

        setupSlider() {

            var offsetAll,
                itemsWithOffset;
               
            this.$items.forEach(function(item, index) {

                if (item.nodeType !== Node.ELEMENT_NODE) { return; }

                var style = window.getComputedStyle(item),
                    marginLeft = parseInt(style.marginLeft),
                    marginRight = parseInt(style.marginRight);

                offsetAll = offsetAll ? (offsetAll + marginLeft + marginRight) : (marginLeft + marginRight);
                itemsWithOffset = index;

            });

            var sliderWidth = Number((this.itemsNum * this.$items[0].offsetWidth) + offsetAll),
                stepOffset = offsetAll / itemsWithOffset;

            this.slideStep = this.$items[0].offsetWidth + stepOffset;
            this.maxSlideNext = sliderWidth - this.$el[0].offsetWidth;
            this.maxSlidePrev = 0;

            this.$slider[0].style.width = sliderWidth + 'px';
            this.$slider[0].style[this.transformPrefixed] = 'translateX(0px)';

        },

        renderButtons() {

            var jPanelTemplate = '<div class="' + this.options.buttonsClass + '">\
                <button class="' + this.options.buttonPrevClass + ' ' + this.options.buttonNeactiveClass + '">' + this.options.buttonPrevText + '</button>\
                <button class="' + this.options.buttonNextClass + '">' + this.options.buttonNextText + '</button>\
            </div>';

            this.$el[0].insertAdjacentHTML('beforeend', jPanelTemplate);

            this.eventsSetup();

            this.options.onRenderButtons && this.options.onRenderButtons(this.$el[0].getElementsByClassName(this.options.buttonsClass));

        },

        eventsSetup() {

            this.$nextBtn = this.$el[0].getElementsByClassName(this.options.buttonNextClass);
            this.$prevBtn = this.$el[0].getElementsByClassName(this.options.buttonPrevClass);

            this.$nextBtn[0].addEventListener('click', () => this.moveNext());
            this.$prevBtn[0].addEventListener('click', () => this.movePrev());

        },

        moveNext() {

            if (this.step > this.maxSlideNext) { return; }

            this.customCallbacks();
            
            this.step = this.step ? (this.step + this.slideStep) : this.slideStep;

            if (this.step < this.maxSlideNext) {
                
                this.maxSlideNext > this.step ? this.animate(this.step) : this.animate(this.maxSlideNext);

                this.$prevBtn[0].className = this.options.buttonPrevClass;

            } else { 

                this.animate(this.maxSlideNext);
                this.setNeactiveBtn(this.$nextBtn[0]);

            }

        },

        movePrev() {

            if (this.step !== this.maxSlidePrev) {

                this.step = this.step - this.slideStep;

                this.animate(this.step);

                this.$nextBtn[0].className = this.options.buttonNextClass;

                this.customCallbacks();

            }

            if (this.step == this.maxSlidePrev) {

                this.setNeactiveBtn(this.$prevBtn[0]);

            }
            
        },

        setNeactiveBtn($btn) {

            if (!hasClass($btn, this.options.buttonNeactiveClass)) {

                $btn.className += ' ' + this.options.buttonNeactiveClass + '';

            }

        },

        animate(step) {

            this.$slider[0].style[this.transformPrefixed] = 'translateX(-' + step + 'px)';

        },

        rebuildListener() {

            var $jContent = this.$el[0].getElementsByClassName('jContent')[0];
            
            window.addEventListener('resize', simpleThrottle(() => {

                $jContent.scrollLeft = 0;
                this.step = 0;

                this.setupSlider();
                this.setNeactiveBtn(this.$prevBtn[0]);

            }));

        },

        customCallbacks() {

            (this.step == undefined) && this.options.onFirstSlide && this.options.onFirstSlide();

            this.options.onSlide && this.options.onSlide();

        },

        destroy() {

            this.$el[0].getElementsByClassName(this.options.buttonsClass)[0].remove();
            this.$slider[0].style = '';
            delete this.options;

        }

    }

    window.jScrolly = jScrolly;

}; 
