
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
            this.$firstItem = this.$items[0];
            this.$lastItem = this.$items[this.itemsNum - 1];
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

        }

        this.eventsSetup = function() {

            this.$nextBtn = document.getElementsByClassName('nextBtn');
            this.$prevBtn = document.getElementsByClassName('prevBtn');

            this.$nextBtn[0].addEventListener('click', this.moveSlide.bind(this));
            this.$prevBtn[0].addEventListener('click', this.moveSlide.bind(this));

        }

        this.moveSlide = function(e) {

            var maxSlideNext = (this.sliderWidth - this.wraperWidth) + this.offsetAll,
                maxSlidePrev = 0,
                maxSteps = Math.round(this.sliderWidth / this.wraperWidth);
            
            this.currentStep = this.currentStep || 0;
            this.step = (this.step ? (this.step + this.slideStep) : this.slideStep) + this.stepOffset;

            if (e.target === this.$nextBtn[0]) {

                this.currentStep++;

                if (this.currentStep <= maxSteps) {

                    this.$slider[0].style.transform = 'translateX(-' + this.step + 'px)';

                } else {

                    this.$slider[0].style.transform = 'translateX(-' + maxSlideNext + 'px)';

                }

            } else {

                this.$slider[0].style.transform = 'translateX(' + this.step + 'px)';

            }

            //console.log(this.sliderWidth, this.wraperWidth);
            console.log(Math.round(this.sliderWidth / this.wraperWidth));
            console.log(this.currentStep);

        }

        // this.setNeactiveBtn = function(e) {

        //     e.target.className += ' neactive';

        // }

        this.rebuild = function() {
            


        }

        this.reset = function() {
            

            
        }

        this.init();

    }

    window.jScrolly = new jScrolly({
        test: 1
    });

})(); 
