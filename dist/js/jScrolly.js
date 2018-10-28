(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['jScrolly'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['jScrolly'] = factory();
  }
}(this, function () {

"use strict";

{
  var jScrolly = function jScrolly(options) {
    var defaults = {
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

  var setPolyfill = function setPolyfill() {
    if (typeof NodeList.prototype.forEach !== 'function') {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  };

  var extendDefaults = function extendDefaults(defaults, options) {
    Object.keys(options).forEach(function (keys) {
      defaults[keys] = options[keys];
    });
    return defaults;
  };

  var simpleThrottle = function simpleThrottle(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    return function () {
      var _this = this,
          _arguments = arguments;

      if (!this.throttled) {
        this.throttled = true;
        clearTimeout(timeoutInit);
        var timeoutInit = setTimeout(function () {
          callback.apply(_this, _arguments);
          _this.throttled = false;
        }, delay);
      }
    };
  };

  var setPrefix = function setPrefix(prefixes, propertyName, self) {
    var testEl = document.createElement('div');
    prefixes.forEach(function (val) {
      if (testEl.style[val] !== undefined && !self[propertyName]) {
        self[propertyName] = val;
      }
    });
  };

  var hasClass = function hasClass(el, className) {
    return el.classList.contains(className);
  };

  var removeClass = function removeClass(el, className) {
    el.classList.remove(className);
  };

  'use strict';

  ;
  jScrolly.prototype = {
    init: function init() {
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
    setupSlider: function setupSlider() {
      var itemsNum, itemOffsetWidth, offsetAll;
      this.$items.forEach(function (item, index) {
        if (item.nodeType === Node.ELEMENT_NODE) {
          var style = window.getComputedStyle(item),
              marginLeft = parseInt(style.marginLeft),
              marginRight = parseInt(style.marginRight);
          itemsNum = itemsNum ? itemsNum + 1 : 1;
          itemOffsetWidth = item.offsetWidth;
          offsetAll = offsetAll ? offsetAll + marginLeft + marginRight : marginLeft + marginRight;
        }
      });
      var sliderWidth = Number(itemsNum * itemOffsetWidth + offsetAll),
          stepOffset = offsetAll / (itemsNum - 1);
      this.slideStep = itemOffsetWidth + stepOffset;
      this.maxSlideNext = sliderWidth - this.$el[0].offsetWidth;
      this.maxSlidePrev = 0;
      this.$slider[0].style.width = sliderWidth + 'px';
      this.$slider[0].style[this.transformPrefixed] = 'translateX(0px)';
      this.$slider[0].style[this.transitionPrefixed] = "".concat(this.options.transitionSpeed, "ms");
      this.$jContent[0].style.overflow = 'hidden';
    },
    renderButtons: function renderButtons() {
      this.$el[0].insertAdjacentHTML('beforeend', "<div class=\"".concat(this.options.buttonsClass, "\">\n\t\t\t\t<button class=\"").concat(this.options.buttonPrevClass, " ").concat(this.options.buttonNeactiveClass, "\">\n\t\t\t\t\t").concat(this.options.buttonPrevText, "\n\t\t\t\t</button>\n\t\t\t\t<button class=\"").concat(this.options.buttonNextClass, "\">\n\t\t\t\t\t").concat(this.options.buttonNextText, "\n\t\t\t\t</button>\n\t\t\t</div>"));
      this.$nextBtn = this.$el[0].getElementsByClassName(this.options.buttonNextClass);
      this.$prevBtn = this.$el[0].getElementsByClassName(this.options.buttonPrevClass);
      this.eventsSetup();
    },
    eventsSetup: function eventsSetup() {
      var _this2 = this;

      this.$nextBtn[0].addEventListener('click', function () {
        return _this2.moveNext();
      });
      this.$prevBtn[0].addEventListener('click', function () {
        return _this2.movePrev();
      });
    },
    moveNext: function moveNext() {
      if (this.step > this.maxSlideNext) {
        return;
      }

      this.customCallbacks();
      this.step = this.step ? this.step + this.slideStep : this.slideStep;

      if (this.step < this.maxSlideNext) {
        this.maxSlideNext > this.step ? this.animate(this.step) : this.animate(this.maxSlideNext);
        this.$prevBtn[0].className = this.options.buttonPrevClass;
      } else {
        this.animate(this.maxSlideNext);
        this.setNeactiveBtn(this.$nextBtn[0]);
      }
    },
    movePrev: function movePrev() {
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
    setNeactiveBtn: function setNeactiveBtn($btn) {
      removeClass(this.$prevBtn[0], this.options.buttonNeactiveClass);
      removeClass(this.$nextBtn[0], this.options.buttonNeactiveClass);

      if (!hasClass($btn, this.options.buttonNeactiveClass)) {
        $btn.className += ' ' + this.options.buttonNeactiveClass + '';
      }
    },
    animate: function animate(step) {
      this.$slider[0].style[this.transformPrefixed] = 'translateX(-' + step + 'px)';
    },
    rebuildListener: function rebuildListener() {
      var _this3 = this;

      window.addEventListener('resize', simpleThrottle(function () {
        _this3.$jContent[0].scrollLeft = 0;
        _this3.step = 0;

        _this3.setupSlider();

        _this3.setNeactiveBtn(_this3.$prevBtn[0]);
      }));
    },
    customCallbacks: function customCallbacks() {
      this.step == undefined && this.options.onFirstSlide && this.options.onFirstSlide();
      this.options.onSlide && this.options.onSlide();
    },
    destroy: function destroy() {
      this.$el[0].getElementsByClassName(this.options.buttonsClass)[0].remove();
      this.$slider[0].style = '';
      delete this.options;
    }
  };
}
;

return jScrolly;

}));
