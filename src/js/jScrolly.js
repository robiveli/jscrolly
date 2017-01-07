
;(function jScrolly(){ 

    'use strict';

    // Setup
    this.options = { 

        '$wrapper' : app.$body.querySelector('.jScrolly'),
        '$item'    : app.$body.querySelector('.jScrolly .action_block')

    };

    this.markupUi = app.$window.microjungle([ 
        ['div', {'class': 'jPanel'},
            ['a', {'role': 'button', 'title' : 'Prethodna', 'class' : 'jPrev jBtn icon_right_arrow'}],
            ['a', {'role': 'button', 'title' : 'Sljedeća', 'class' : 'jNext jBtn icon_left_arrow'}]
        ]
    ]);

    // Initialize
    initJscrolly = function() { 

        // Globals
        var wrapperWidth = this.options.$wrapper.children.length * this.options.$item.offsetWidth;
        this.options.$wrapper.style.width = wrapperWidth + 'px';
        this.options.$wrapper.appendChild(this.markupUi);


        // Movements
        moveNext = function() { 

            this.options.$wrapper.style.marginLeft = '-' + (wrapperWidth - this.options.$wrapper.parentElement.offsetWidth) + 'px'; 

        };

        moveRight = function() { 

            this.options.$wrapper.style.marginLeft = '0px'; 

        };

        // Events
        app.$body.querySelector('.jNext').addEventListener('click', function() { 
            
            moveNext();

        }, false);

        app.$body.querySelector('.jPrev').addEventListener('click', function() { 

            moveRight();

        }, false);

    };

    // Reset
    resetJscrolly = function() {

        this.options.$wrapper.removeAttribute('style');

    };

    // Export jScrolly
    //app.$window.jScrolly = initJscrolly;

})(); 
