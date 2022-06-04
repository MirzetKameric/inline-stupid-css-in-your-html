# inline-stupid-css-in-your-html

A simple script that will go through your static HTML files, open all CSS crap in there and inline it, then it will remove imports for those CSS files. I did this because I couldnt find a nice tool to do this simple job. Also, I didnt want to spend much time searching for a good npm package, so instead I spent my day off building this (would have been faster to just copy paste again and again all css stuff into my html). You can do this to improve your page score on insights and to eliminate render-blocking resources therefore making your pages faster. 

## How to use
1. In magic.js file, set YOUR_BUILD_DIRECTORY (this is where I will save all new ugly HTML files)
2. On line 7 in magic.js script, list names of files you want to process with the script. It's a javascript array, so you do it like this ['index', 'team', 'about-us'] etc. These are names of your HTML files without the extension. 
3. Depending on where you copy the script and package file, you might need to add '../../' or '../' on line 8 of the script to match location of your HTML files.

