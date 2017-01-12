
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
            this.sliderWidth = this.itemsNum * this.$items[0].offsetWidth;
            this.slideStep = this.$items[0].offsetWidth;

            this.setupSlider();
            this.renderUI();

        }

        this.setupSlider = function() {

            var offsetAll;
               
            this.$items.forEach(function(item) {

                var style = window.getComputedStyle(item),
                    marginLeft = parseInt(style.marginLeft) || 0,
                    marginRight = parseInt(style.marginRight) || 0;

                offsetAll = offsetAll ? (offsetAll + marginLeft + marginRight) : (marginLeft + marginRight);

            });

            this.$slider[0].style.width = Number(this.sliderWidth + offsetAll) + 'px';
            this.$slider[0].style.transform = 'translateX(0px)';

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

            this.$nextBtn[0].addEventListener('click', this.moveNext.bind(this));
            this.$prevBtn[0].addEventListener('click', this.movePrev.bind(this));

        }

        this.moveNext = function() {

            console.log(this.slideStep);

            this.$slider[0].style.transform = 'translateX(-' + this.slideStep + 'px)';

        }

        this.movePrev = function() {

            this.$slider[0].style.transform = 'translateX(' + this.slideStep + 'px)';
            
        }

        this.rebuild = function() {
            


        }

        this.reset = function() {
            

            
        }

        this.init();

    }

    window.jScrolly = new jScrolly('1');

})(); 
