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

<br/>
<br/>
<br/>

# Scrolling Method
To try and keep things in sync, the preview will auto-scroll to try and keep up
with the input form. However, if a user wants they can also adjust the preview form if it comes off for extra long files, or files that have a lot of run on lines

The way it works is simple. Take the height of the form, then divide it by the scroll height, which shows approximately what percentage down a user has scrolled. This percentage is then sent to the preview side, so that it scrolls down to that percent to match.

## issues with this and workarounds
As you can see, this is error prone, since specific parts of text will be bigger or smaller on each side. A multi line link might only take up one in markdown, headers will always be thicker on the markdown side than the input side. Also, I can't seem to find the scrollHeight property on the AceEditor like I could with a plain text editor. The work around for this is taking the line number and multiply by 16.5, which is roughly the height in pixels of a line. However, this has issues in wraparound mode. If a line goes beyond view, it wraps, but still takes up one "line" in Ace, even though it is now 2 or 3 lines thick.

To compensate for these things, users are able to scoot the preview text up and down

## Using a user offset
@ TODO: fix this section if you ever want anyone else to be able to read it properly

When a user mouses into the preview side, the `handleMouseEnter()` and `handleMouseLeave()` determind behavior by having the element be in "focus". This differentiates the auto scroll behavior from the user adjustments.

Assuming the user is manually scrolling the preview side, they will alter the `state.offset` property. All this does is take the `scrollTop` property of the form and subtract it from the auto generated `state.scrollTop` property that is set by the input form being scrolled up and down. This new offset value is added to the previous offset value, `state.prevOffset`, and becomes the new `state.offset` value. We can't combine our new offset value directly to the `state.offset` value, becuase that would create exponential growth. We add it to the `prevOffset` and use that value to take into account all previous offsets made by the user that were interupted by autoscrolls from the form.

```js
handlePreviewScroll = () => {
    if (this.state.focused) {
        const newOffset = (this.el.scrollTop - this.state.currentScrollTop);
        this.setState({
            offset: this.state.prevOffset + newOffset,
        });
    }
}
```

Another reason we use the `prevOffset` is because once the `state.currentScrollTop` changes, then the new user offset would start from 0 each time the user scrolls the preview after scrolling the form. The offset wouldn't be able to keep track of multiple user fixes. To get around this, we reset `state.prevOffset` to `state.offset` every time the user autoscrolls the form. We do this in the mdpreview `componentDidUpdate` function

```js
componentDidUpdate(prevProps) {
    if (prevProps.note.scroll !== this.props.note.scroll) {
        this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
        this.el.scrollTop += this.state.offset;
        this.setState({
            currentScrollTop: this.el.scrollTop,
            prevOffset: this.state.offset, // reset prevOffset
        });
    }
}
```

