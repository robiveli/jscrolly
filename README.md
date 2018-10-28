# jScrolly #
### simple dependency-free javascript carousel slider plugin ###

### Install ###

```
npm install jscrolly
```

### Usage ###

Include script:
```
<script src="jScrolly.js"></script>
```

or
```
import jScrolly from 'jScrolly';
```

Include styling for buttons (optionally, style it as you wish):
```
<link href='jScrolly.css' rel='stylesheet' type='text/css'>
```
or
```
@import 'jScrolly';
```

Initial required structure, place any content you want within the items:
```
<div class="jScrolly">
    <div class="jContent">
        <div class="slider">
        	<div></div>
        	<div></div>
        	<div></div>
        	<div></div>
        </div>
    </div>
</div>
```
Finally, initialize jScrolly:
```
<script>
    var myScroller = new jScrolly();
</script>
```

### Demo ###

Demo available [here](https://www.rvdizajn.com/jscrolly/).

### Options ###

jScrolly can take an optional parameters - an object of key/value settings:

- **$transitionSpeed** String *(default:400ms)* - speed of previous and next transitions (in milliseconds)
- **buttonsClass** String *(default:jPanel)* - css class for buttons container
- **buttonPrevClass** String *(default:prevBtn)* - css class for previos button
- **buttonNextClass** String *(default:nextBtn)* - css class for next button
- **buttonNeactiveClass** String *(default:neactive)* - css class for neactive button
- **buttonPrevText** String *(default:Previous)* - text for for previos button
- **buttonNextText** String *(default:Next)* - text for for next button
- **onFirstSlide** Function *(default:null)* - runs only once on first slide change
- **onSlide** Function *(default:null)* - runs at slide change

**Example**
```
<script>
    var myScroller = new jScrolly({

        onFirstSlide: function() {
            console.log('On first slide change');
        },

        onSlide: function() {
            console.log('On every slide change');
        }

    });
</script>
```

Default css settings are placed in `/sass/library/_variables.scss`:

- **$baseColor** *(default:#3A3A3A)* - main color for buttons
- **$btnSize** *(default:60)* - size of buttons in rem unit

### API ###

`moveNext()` - slide to next slide

`movePrev()` - slide to prev slide

`destroy()` - destroys the current instance of jScrolly

### Browser support ###

It works in every modern browser where [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) is supported.

Consider using polyfill [classList](https://github.com/eligrey/classList.js/) feature if needed.


### License  ###

jScrolly is licensed under the [MIT license](http://opensource.org/licenses/MIT).
