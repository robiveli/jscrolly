# jScrolly #
### simple dependency-free javascript carousel slider plugin

### Install ###

With Bower:
```sh
bower install jscrolly
```

### Usage ###

Include required javascript:
```sh
<script src="jScrolly.js"></script>
```

Include css:
```sh
<link href='jScrolly.css' rel='stylesheet' type='text/css'>
```

Initial required structure, place any content you want within the items:
```sh
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
```sh
<script>
    var myScroller = new jScrolly();
</script>
```

### Demo ###

Demo available [here](http://www.rvdizajn.com/jscrolly/).

### Options ###

jScrolly can take an optional parameters - an object of key/value settings:

- **buttonsClass** String *(default:jPanel)* - css class for buttons container
- **buttonPrevClass** String *(default:prevBtn)* - css class for previos button
- **buttonNextClass** String *(default:nextBtn)* - css class for next button
- **buttonPrevText** String *(default:Previous)* - text for for previos button
- **buttonNextText** String *(default:Next)* - text for for next button
- **onRenderButtons** Function *(default:null)* - runs when buttons are rendered to DOM
- **onFirstSlide** Function *(default:null)* - runs only once on first slide change
- **onSlide** Function *(default:null)* - runs at slide change

**Example**
```sh
<script>
    var myScroller = new jScrolly({

        onRenderButtons: function($arrowsWrap) {
            console.log($arrowsWrap + 'is rendered');
        },

        onFirstSlide: function() {
            console.log('On first slide change');
        },

        onSlide: function() {
            console.log('On slide change');
        }

    });
</script>
```

Default css settings are placed in `/sass/library/_variables.scss`:

- **$baseColor** *(default:#3A3A3A)* - main color for buttons
- **$transitionSpeed** *(default:400ms)* - speed of previous and next transitions
- **$btnSize** *(default:60)* - size of buttons in rem
- **$baseBreakpoint** *(default:680px)* - media query value

**Note:**
To keep simplicity, native scrolling feature is applied for small screen sizes, based on `$baseBreakpoint` value.


### License  ###

jScrolly is licensed under the [MIT license](http://opensource.org/licenses/MIT).
