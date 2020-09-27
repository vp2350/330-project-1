# 330-project-1

## Phyllotaxis Playground:

[Link to live project](https://people.rit.edu/~vp2350/330/330-project-1-master/)

### Theme

The app is a canvas that lets you draw a phyllotaxis wherever you click on the canvas. 

It lets you switch between several settings and choose whether to apply these settings to the previous phyllotaxes or only the newer ones.

The app also lets you switch between different different colors and special characters, including emojies and a set of 7 different memes, with the memes showing completely when the screen is populated with all phyllotaxis using the "Random Meme" dot colour. 

Switching off from the Random Meme dot color and back to it provides the user with a different meme. 

### User Experience

The app has a blank canvas with the heading `Click anywhere to create a phyllotaxis`

The user controls are as follows:

#### Buttons

The only button the project uses is the clear screen button, which is bigger than the rest of the controls and clearly displayed.

#### Selectors

The program has the following select elements:


##### Dot Padding

This selector changes the padding of the dots (c-value) for the phyllotaxes

##### Divergence Angle

This selector changes the angle change the phyllotaxes follow 

##### Dot Color Type:

This selector offers the different color schemes the phyllotaxes can follow, including the emoji scheme and random memes. 

##### Radius Increase Rate

This selector lets the user change the rate with which the phyllotaxes grow (n-value)

##### Clear Screen on Settings Change

This selector lets the user decide whether to clear the screen when they pick a new setting for the phyllotaxes or not

##### Settings Change affect previous Phyllotaxes

This selector lets the user decide whether to apply the new settings to previous drawn phyllotaxes or not

### Bugs

Currently the only known bug is that with some particular settings (*Clear Screen on settings change* and *Settings change affect previous Phyllotaxes*) when combined in a particular order prevent
the current Dot Color from functioning properly sometimes. Still unable to 100% recreate the bug.

Switching the Dot Color to a different one then switching back to the required one fixes the problem. 

### Media

The html of the file is divided into several different elements including divs, labels, sections and headings which are used to structure the document properly.

The following links are used as image sources to draw the random meme Phyllotaxes:

https://filmdaily.co/wp-content/uploads/2020/09/amongusmemes-03-1.jpg   
https://filmdaily.co/wp-content/uploads/2020/09/amongusmemes-05-1.jpg   
https://filmdaily.co/wp-content/uploads/2020/09/amongusmemes-10-1.jpg       
https://filmdaily.co/wp-content/uploads/2020/09/amongusmemes-12-1.jpg   
https://cdn.ebaumsworld.com/2020/03/05/025050/86217793/gaming-meme-45.jpg     
https://img.buzzfeed.com/buzzfeed-static/static/2018-08/20/17/asset/buzzfeed-prod-web-04/sub-buzz-24833-1534799890-4.jpg       
https://filmdaily.co/wp-content/uploads/2020/09/amongusmemes-03-1.jpg  

The css for the file is hosted in the default-styles.css file and uses the Mulish google font and several other interactive styles for the buttons and selectors.

Both the HTML and CSS pass validation

### Code

The JavaScript code is hosted in 2 different files:

#### Index.js

This file hosts the main functions of the project, including Init and the update loop, and is wrapped in an IIFE.

The file has an array of phyllotaxis class objects.

It takes care of drawing the dots every frame by looping through the array and also reacting to any button or selector interaction.


#### vpLIB.js

This file contains all of the functions and the Phyllotaxis class.

The phyllotaxis class itself contains several properties and the function that is used to draw the dots on the screen, which is called by Index.js.

### Above and Beyond and Expected Grade

The neatest thing about the project is the dot color types. It lets you choose between HSL colors, Random colors, a Linear Gradient, A Radial Gradient, and most importantly, the Emoji pattern and the Random meme. 

The emoji pattern lets you use emojies as the dots and the Random meme lets you draw a meme in the background, which is revealed as the canvas gets filled with the phyllotaxes.

The project deserves at least a 95 because I put in great care to provide maximum functionality and a clean interface. The only downfall so far is the one bug I was unable to fix in time.
