
var app = window.app || {}; 

(function() { 

    window.extend(app, {

        breakpointMedium: 799,
        themeUrl: document.querySelector('html').getAttribute('data-theme-url'),

        $html: document.querySelector('html'),
        $body: document.querySelector('body'),
        $mainHeader: document.querySelector('.mainHeader'),
        $menuBtn: document.querySelector('.menuBtn'),
        $viewPort: document.querySelector('.viewPort'),
        $mainVideo: document.querySelector('video'),

        init: function() {

            this.events();

            this.setupLazyLoad();
            this.$mainVideo && this.setupVideo();

        },

        events: function() {

            app.$menuBtn.addEventListener('click', this.setupMainNav);

            window.getContext(app.breakpointMedium) && window.addEventListener('scroll', function() {

                this.setupHeaderFixed();

            }.bind(this), false);

        },

        setupLazyLoad: function() {

            this.bLazy = this.bLazy || new Blazy({

                offset: 500,
                selector: '.lazyImg'

            });

        },

        setupMainNav: function() {

            if (!this.mainNavSetuped) {

                window.ljs.load(app.themeUrl + 'css/partials/mainNav.css', function(){

                    clearTimeout(this.setTimeout);
                    this.setTimeout = setTimeout(function(){ 

                        window.toggleClass(app.$html, 'menuOpen'); 

                    }.bind(this), 300);

                });

                this.mainNavSetuped = true;

            } else {

                window.toggleClass(app.$html, 'menuOpen'); 

            }

            app.setupMainOverlay();

        },

        setupMainOverlay: function() {

            if (!this.mainOverlaySetuped) {

                this.$mainOverlay = document.createElement('div');
                this.$mainOverlay.className += 'mainOverlay';

                app.$body.appendChild(this.$mainOverlay);
                this.$mainOverlay.addEventListener('click', function(){

                    window.removeClass(app.$html, 'menuOpen');

                }.bind(this), false);

                this.mainOverlaySetuped = true;

            }

        },

        setupHeaderFixed: function() {

            var inViewport = window.isInViewport(app.$viewPort);

            if (inViewport && window.hasClass(app.$html, 'mainHeaderFixed')) {

                window.removeClass(app.$html, 'mainHeaderFixed');

            } else if (!inViewport && !window.hasClass(app.$html, 'mainHeaderFixed')) {

                window.addClass(app.$html, 'mainHeaderFixed');

            }

        },

        setupVideo: function() {

            // check video support
            var supportsVideo = !!document.createElement('video').canPlayType;

            if (supportsVideo) {

                // first hide the default controls
                this.$mainVideo.controls = false;

                // then start
                this.initVideo();

            } else {

                this.fallbackVideo();

            }
            
        },

        initVideo: function() {

            window.addEventListener('scroll', function() {

                if (window.isInViewport(this.$mainVideo) && !this.videoInitialized ) {

                    this.$mainVideo.play();
                    this.videoInitialized = true;

                } else {

                    return;

                }

            }.bind(this), false);

        },

        fallbackVideo: function() {

            var fallbackImgUrl = this.$mainVideo.getAttribute('poster'),
                fallbackImg = document.createElement('img'),
                fallbackImgCont = document.createElement('div');

            // set attributes
            fallbackImg.setAttribute('src', fallbackImgUrl);
            fallbackImgCont.setAttribute('class', 'mainImg');

            // append new elements
            this.$mainVideo.closest('.mainSection').appendChild(fallbackImgCont);
            fallbackImgCont.appendChild(fallbackImg);

            // finaly remove the video container
            this.$mainVideo.parentNode.remove();
            
        }

    });

    app.init();

})();
