
;(function() { 

    'use strict';

    var jScrolly = function(options) {

        console.log(options);

        this.options = {

            prev: 'Previous',
            next: 'Next'

        };

        this.init = function() {

            this.$el = document.getElementsByClassName('jScrolly');
            this.$slider = this.$el[0].getElementsByClassName('slider');
            this.$items = this.$slider[0].childNodes;
            this.itemsNum = this.$items.length;
            this.wraperWidth = this.$el[0].offsetWidth;
            this.sliderWidth = this.itemsNum * this.$items[0].offsetWidth;
            this.slideStep = this.$items[0].offsetWidth;

            this.setupSlider();
            this.renderUI();

        }

        this.setupSlider = function() {

            var offsetAll,
                itemsWithOffset;
               
            this.$items.forEach(function(item, index) {

                var style = window.getComputedStyle(item),
                    marginLeft = parseInt(style.marginLeft),
                    marginRight = parseInt(style.marginRight);

                offsetAll = offsetAll ? (offsetAll + marginLeft + marginRight) : (marginLeft + marginRight);
                itemsWithOffset = index;

            });

            this.$slider[0].style.width = Number(this.sliderWidth + offsetAll) + 'px';
            this.$slider[0].style.transform = 'translateX(0px)';

            this.stepOffset = offsetAll / itemsWithOffset;
            this.offsetAll = offsetAll;

            // TODO - vendor support
            //this.$slider[0].style.WebkitTransform = 'translate(0px)';

        }

        this.renderUI = function() {

            var jPanelTemplate = '<div class="jPanel">\
                <button class="prevBtn">' + this.options.prev + '</button>\
                <button class="nextBtn">' + this.options.next + '</button>\
            </div>';

            this.$el[0].insertAdjacentHTML('beforeend', jPanelTemplate);

            this.eventsSetup();
            this.setupMoves();

        }

        this.eventsSetup = function() {

            this.$nextBtn = document.getElementsByClassName('nextBtn');
            this.$prevBtn = document.getElementsByClassName('prevBtn');

            this.$nextBtn[0].addEventListener('click', this.moveNext.bind(this));
            this.$prevBtn[0].addEventListener('click', this.movePrev.bind(this));

        }

        this.setupMoves = function(e) {

            this.maxSlideNext = (this.sliderWidth - this.wraperWidth) + this.offsetAll;
            this.maxSlidePrev = 0;
            this.maxSteps = Math.round(this.sliderWidth / this.wraperWidth);
            this.currentStep = 0;

        }

        this.moveNext = function() {

            if (this.currentStep === this.maxSteps) {

                return;

            } else {

                this.currentStep++;
                this.step = (this.step ? (this.step + this.slideStep) : this.slideStep) + this.stepOffset;

                if (this.currentStep !== this.maxSteps) {

                    this.animate(this.step);

                } else {

                    this.animate(this.maxSlideNext);

                }

            }

        }

        this.movePrev = function() {

            if (this.currentStep === this.maxSlidePrev) {

                return;

            } else {

                this.currentStep--;
                this.step = (this.step - this.slideStep) - this.stepOffset;

                this.animate(this.step);

            }
            
        }

        this.animate = function(step) {

            this.$slider[0].style.transform = 'translateX(-' + step + 'px)';

        }

        this.rebuild = function() {
            


        }

        this.destroy = function() {
            

            
        }

        this.init();

    }

    window.jScrolly = jScrolly;

})(); 
