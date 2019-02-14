# Highlighting and Ollie
For highlighting code blocks, Ollie uses [Highlight.js](https://highlightjs.org) with the marked renderer.

## Specifying a language
`Highlight.js`'s auto detection can slow you down, so always specify the language for a code block like so:

\```js\
// this code block would be highlighted as javascript\
let x = 2;\
\```

if you want no highlighting:

\```plaintext\
this will just be monospace font, maybe good for console logs\
\```

In the rendered markdown, the language won't be there. For a list of available langauges to choose from, check [highlight's list](https://highlightjs.org/static/demo/).

## Changing the default style
- Ollie notes comes set with a pretty standard night theme, but it's quite easy to change it.
- Simple go to the `toggleHighlighting.js` file, and change the import line where it pulls the css styles on highlight.js' github

```
import { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // RIGHT HERE
```
- To see what they look like check out the [demos here](https://highlightjs.org/static/demo/)
- Then make sure the corresponding file is available in their github [here]( https://github.com/highlightjs/highlight.js/tree/master/src/styles)

```
import  highlight.js/styles/[file-name-from-github-here.css]
```

## Selective Highlighting
Highlight.js is pretty fast, but on longer files, it just can't keep up. In `createMarkdown.js` you will find the `configureRenderer()`, which actually tells `marked` how to highlight:

```
configureRenderer(markedEngine, text, cursorIndex, isSelectiveHighlight)
```

This will tell `marked` to render all highlights when `isSelectiveHighlight` is false. This is fine when Ollie is in viewing mode. However, in edit mode, every single keypress re-renders the entire note. On short files, highlight *can* keep up, on longer files that is simply not possible and performance lags badly.

To get around this, `configureRenderer` keeps track of where the user's cursor is, and will only apply highlighting to codeblocks that are in the vicinity of the cursor. If a user scrolls a lot, they will see the code blocks are just black and gray. Once they click them though, the highlighting will be applied immediately.

@TODO: In the future, users will be able to toggle selective highlighting with a button on the interface. For now, you can just increase the distance comparison check manually


# race condition issue
- While we can tell the system to write a file, JS doesn't actually wait for that file to be written. Even if you tell it to writeFileSync, that just makes the JS file halt everything else while it sends the create command, but it doesn't halt everything for a response.
- Because of this delay, an artificial one had to be added by way of a sleep function. I have found 1 second to be more than enough on my machine, however if you are running into missing file errors on create, then you will need to change the duration of the sleep funciton in `server/routes/create.js`
- also, if you want to speed it up, feel free to experiment and see how fast your machine can run, my fastest was 500ms.

## nodemon watch
- By default, nodemon will monitor the CWD for any changes to .js and .json files
- however, this doesn't work for us, since `files.json` will update and cause a server restart *before* our server will be able to send a response for a create request.
- To avoid this, we tell nodemon to only monitor the server files, which also makes sense anyway, since we don't need to restart the server everytime we make a change in the frontend files either (though that is technically harmless)