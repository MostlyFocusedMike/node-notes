## How does highlighting work?
For highlighting, Ollie uses [Highlight.js](https://highlightjs.org) which has a nice default option so users don't have to specify the code language if they don't want. Specifically, Ollie alters the marked Renderer's behavioir. Now, when it comes across a code block in the markdown it will convert that text according to highlight.js.

However, if a user fails to specify the languge a LOT then the performance will lag (or maybe if it's old hardware) so TODO: add a way to turn this behavior off using a button with state.

## Specifying a language
Highlight.js' auto detection can slow you down, so whenever possible, specify the language. Do this by putting it next to the ``` without any space. (ignore that \ that is just so we github doesn't actually turn the triple ticks into a code block)

\```js
// this code block would be highlighted as javascript
let x = 2;
\```

if you want no highlighting:

\```plaintext
this will just be monospace font, maybe good for console logs
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
