# jScrolly #
### simple dependency-free javascript carousel slider plugin

### Install ###

```sh
# Bower
bower install --save jscrolly

# NPM
npm install jscrolly
```

### Usage ###

Here is the initial required structure, place any content you want within the items:
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

### Demo ###

Demo available [here](#).

### Options ###

jScrolly can take an optional parameters - an object of key/value settings:

- **buttonsClass** String *(default:jPanel)* - index position Swipe should start at
- **buttonPrevClass** String *(default:prevBtn)* - css class for previos button
- **buttonNextClass** String *(default:nextBtn)* - css class for next button
- **buttonPrevText** String *(default:Previous)* - text for for previos button
- **buttonNextText** String *(default:Next)* - text for for next button
- **onRenderButtons** Function *(default:null)* - runs when buttons are rendered to DOM
- **onFirstSlide** Function *(default:null)* - runs only once on first slide change
- **onSlide** Function *(default:null)* - runs at slide change

### License  ###

jScrolly is licensed under the [MIT license](http://opensource.org/licenses/MIT).
