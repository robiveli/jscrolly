{

    'use strict';

    function jScrolly (options) {

        let defaults = {

            buttonsClass: 'jPanel',
            buttonPrevClass: 'prevBtn',
            buttonNextClass: 'nextBtn',
            buttonNeactiveClass: 'neactive',
            buttonPrevText: 'Previous',
            buttonNextText: 'Next',
			transitionSpeed: '400',
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

    function setPrefix(prefixes, propertyName, self) {

        let testEl = document.createElement('div');

        prefixes.forEach((val) => {

            if (testEl.style[val] !== undefined && !self[propertyName]) {

                self[propertyName] = val;

            }

        });

    }

    function hasClass(el, className) {

        return el.classList.contains(className);

    }

    function removeClass(el, className) {

		el.classList.remove(className);

    }

    jScrolly.prototype = {

        init() {

			this.$el = document.getElementsByClassName('jScrolly');
			this.$jContent = this.$el[0].getElementsByClassName('jContent');
            this.$slider = this.$el[0].getElementsByClassName('slider');
            this.$items = this.$slider[0].childNodes;

			setPrefix(['transform', 'WebkitTransform', 'msTransform', 'MozTransform'], 'transformPrefixed', this);
			setPrefix(['transition', 'WebkitTransition', 'oTransition', 'MozTransition'], 'transitionPrefixed', this);

            this.setupSlider();
            this.renderButtons();
            this.rebuildListener();

        },

        setupSlider() {

            var itemsNum,
                itemOffsetWidth,
                offsetAll;

            this.$items.forEach((item, index) => {

                if (item.nodeType === Node.ELEMENT_NODE) {

                    let style = window.getComputedStyle(item),
                        marginLeft = parseInt(style.marginLeft),
                        marginRight = parseInt(style.marginRight);

                    itemsNum = itemsNum ? itemsNum + 1 : 1;

                    itemOffsetWidth = item.offsetWidth;
                    offsetAll = offsetAll ? (offsetAll + marginLeft + marginRight) : (marginLeft + marginRight);

                }

            });

            let sliderWidth = Number((itemsNum * itemOffsetWidth) + offsetAll),
                stepOffset = offsetAll / (itemsNum - 1);

            this.slideStep = itemOffsetWidth + stepOffset;
            this.maxSlideNext = sliderWidth - this.$el[0].offsetWidth;
            this.maxSlidePrev = 0;

            this.$slider[0].style.width = sliderWidth + 'px';
			this.$slider[0].style[this.transformPrefixed] = 'translateX(0px)';
			this.$slider[0].style[this.transitionPrefixed] = `${this.options.transitionSpeed}ms`;
			this.$jContent[0].style.overflow = 'hidden';

        },

        renderButtons() {

            this.$el[0].insertAdjacentHTML('beforeend', `<div class="${this.options.buttonsClass}">
				<button class="${this.options.buttonPrevClass} ${this.options.buttonNeactiveClass}">
					${this.options.buttonPrevText}
				</button>
				<button class="${this.options.buttonNextClass}">
					${this.options.buttonNextText}
				</button>
			</div>`);

			this.$nextBtn = this.$el[0].getElementsByClassName(this.options.buttonNextClass);
            this.$prevBtn = this.$el[0].getElementsByClassName(this.options.buttonPrevClass);

            this.eventsSetup();

        },

        eventsSetup() {

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

            removeClass(this.$prevBtn[0], this.options.buttonNeactiveClass);
            removeClass(this.$nextBtn[0], this.options.buttonNeactiveClass);

            if (!hasClass($btn, this.options.buttonNeactiveClass)) {

                $btn.className += ' ' + this.options.buttonNeactiveClass + '';

            }

        },

        animate(step) {

            this.$slider[0].style[this.transformPrefixed] = 'translateX(-' + step + 'px)';

        },

        rebuildListener() {

            window.addEventListener('resize', simpleThrottle(() => {

                this.$jContent[0].scrollLeft = 0;
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

};
