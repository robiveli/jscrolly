
;(function() { 

    'use strict';

    var jScrolly = function(options) {

        console.log(options);

        var defaults = {

            prevText: 'Previous',
            nextText: 'Next'

        };

        this.options = options ? extendDefaults(defaults, options) : defaults;

        this.init();

    };

    function extendDefaults(defaults, options) {

        Object.keys(options).forEach(function(keys) {

            defaults[keys] = options[keys];

        }.bind(this));

        return defaults;
        
    }

    jScrolly.prototype = {

        init: function() {

            this.$el = document.getElementsByClassName('jScrolly');
            this.$slider = this.$el[0].getElementsByClassName('slider');
            this.$items = this.$slider[0].childNodes;
            this.itemsNum = this.$items.length;
            this.wraperWidth = this.$el[0].offsetWidth;
            this.initialSliderWidth = this.itemsNum * this.$items[0].offsetWidth;

            this.setupSlider();
            this.renderUI();
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

            this.sliderWidth = Number(this.initialSliderWidth + offsetAll);
            this.stepOffset = offsetAll / itemsWithOffset;
            this.offsetAll = offsetAll;
            this.slideStep = this.$items[0].offsetWidth  + this.stepOffset;
            this.maxSlideNext = this.sliderWidth - this.wraperWidth;
            this.maxSlidePrev = 0;

            this.$slider[0].style.width = Number(this.initialSliderWidth + offsetAll) + 'px';
            this.$slider[0].style.transform = 'translateX(0px)';

            // TODO - vendor support
            //this.$slider[0].style.WebkitTransform = 'translate(0px)';

        },

        renderUI: function() {

            var jPanelTemplate = '<div class="jPanel">\
                <button class="prevBtn">' + this.options.prevText + '</button>\
                <button class="nextBtn">' + this.options.nextText + '</button>\
            </div>';

            this.$el[0].insertAdjacentHTML('beforeend', jPanelTemplate);

            this.eventsSetup();

        },

        eventsSetup: function() {

            this.$nextBtn = document.getElementsByClassName('nextBtn');
            this.$prevBtn = document.getElementsByClassName('prevBtn');

            this.$nextBtn[0].addEventListener('click', this.moveNext.bind(this));
            this.$prevBtn[0].addEventListener('click', this.movePrev.bind(this));

        },

        moveNext: function() {

            if (this.step > this.maxSlideNext) { return; }

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

            }
            
        },

        animate: function(step) {

            this.$slider[0].style.transform = 'translateX(-' + step + 'px)';

        },

        rebuildListener: function() {
            
            window.addEventListener('resize', function(e) {

                this.animate(0);
                this.step = 0;

            }.bind(this));

        }

    }

    window.jScrolly = jScrolly;

})(); 
