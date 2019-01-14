## How does highlighting work?
For highlighting, Ollie uses [Highlight.js](https://highlightjs.org) which has a nice default option so users don't have to specify the code language if they don't want. Specifically, Ollie alters the marked Renderer's behavioir. Now, when it comes across a code block in the markdown it will convert that text according to highlight.js.

However, it only does this in the View Mode, since it is resource heavy, and on longer notes can take several seconds. There may be a way to fix this with web workers, but for now it will just have to hang a few seconds.

## Specifying a language
While highlight.js' auto detection is good, sometimes it misses some things. So, if a user wants to specify what language is in the code block, they have to put it on the first line.

```
js
// this code block would be highlighted as javascript
let x = 2;
```

In View Mode, that js won't be there. For a list of available langauges to choose from, check [highlight's list](https://highlightjs.org/static/demo/).

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
