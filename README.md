# Le French typography

Sketch plugin to automatically add typographical French conventions and give a nice touch to UIs. Things like nonbreakable spaces or better fractions.


## Install

Download [the latest release](https://github.com/Saint-loup/french-typography/releases/latest) and open the file. You can also use package managers like  [Sketch Runner](https://sketchrunner.com/) or [Sketchpacks](https://www.sketchpacks.com/Saint-loup/french-typography).

Feedbacks and bug reports are welcome.

##  What it does

When you unselect a text layer, it replaces some characters with their proper equivalents. 

**Interaction with Mac OS** – It works whether you enable smart quotes substitutions at the system level (System > Keyboard > Text) or not. This Mac OS feature use non-breakable spaces only for quotes.

**A word of caution about narrow non-breakables spaces** – It's the convention to use this character (\u202F), but it's disabled by default because of a bug in Safari which renders it as a zero-width space. For instance if you copy & paste the text into Safari or export it with Craft, you will end up with many invisible spaces. Also, some typefaces don't support this space (some only in Sketch, some everywhere).That's why there's a setting to choose between normal or narrow spaces. Toggling it will also set the correct space for existing text layers in the current document.  

**Non-French French** – The plugin *may* work in some francophone contexts, with various limits. For instance Canadian French seems closer to english punctuation.

##### Character substitutions

| Symbol                      | Status |
| ---------------------------- | ------ |
| From " to «                |  ✔️  |
| From double dash (--) to en-dash (–)       |  ✔️  |
| Some fractions (½, ⅓, ¼ )           |  ✔️  |
| Ordinal suffixes: from 2e to 2ᵉ|  ✔️  |
| Ellipsis…   |  ✔️  |
| From N° to №                     |  ✔️  |


##### Insertion of non-breaking spaces

| Symbol                 | Status |
| --------------------- | ------- |
| :                     |  ✔️  |
| «                     |  ✔️  |
| »                     |  ✔️  |
| !                     |  ✔️  |
| ?                     |  ✔️  |
| ;                     |  ✔️  |
| %                     |  ✔️  |
| En-dash  (*tiret demi-quadratin*)      |  ✔️  |
| Currency:  $ €        |  ✔️  |
| Hundreds, thousands, etc.  |      |


## What it doesn't do


* Inserting non-breaking spaces in complex cases (eg. latitudes), listed [here](https://www.btb.termiumplus.gc.ca/tpv2guides/guides/chroniq/index-fra.html?lang=fra&lettr=indx_autr8cDRJ-6fjpl0&page=9ouqyIer24Kc.html) or [there](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Non-breaking_spaces).
* Accents on capital letters. There's no way to automatically tell SALE and SALÉ apart.
* Things that would be better handled with dedicated markup. For instance, support and rendering of [fractions and exposants](https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts#Superscripts_and_subscripts_block) in Unicode is really spotty.
* Typos like double spaces.


## Boring stuff

##### Build from source

Follow SKPM instructions : [here](https://skpm.io/help/) and [there](https://developer.sketchapp.com/guides/)

##### Tests

To check for errors in regex, in the plugin folder run:

`npm test`

It's a shorcut for : 
build && <sketchTool path> run <plugin path> testRegex

##### Debuging

There's a little debug mode, enabled by placed a file named "debug" in the assets folder. It results in logs in the console and in Sketch, when using the plugin. 
