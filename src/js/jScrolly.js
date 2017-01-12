
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

            console.log(this.sliderWidth);

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

            this.$slider[0].setAttribute('style', 'width:' + Number(this.sliderWidth + offsetAll) + 'px');

        }

        this.renderUI = function() {

            var jPanelTemplate = '<div class="jPanel">\
                <button class="prevBtn">' + this.options.prev + '</button>\
                <button class="nextBtn">' + this.options.next + '</button>\
            </div>';

            this.$el[0].insertAdjacentHTML('beforeend', jPanelTemplate);

        }

        this.events = function() {

            
            
        }

        this.moveNext = function() {



        }

        this.movePrev = function() {

            
            
        }

        this.rebuild = function() {
            


        }

        this.reset = function() {
            

            
        }

        this.init();

    }

    window.jScrolly = new jScrolly('1');

})(); 
