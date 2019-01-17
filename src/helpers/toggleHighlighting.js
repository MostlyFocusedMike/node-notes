import { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
/*
    Change the above line to alter the styling of the code blocks!
    https://highlightjs.org/static/demo/ - this will show you what all they look like
    https://github.com/highlightjs/highlight.js/tree/master/src/styles - then use the file here
    highlight.js/styles/[file-name-from-github-here.css]
*/

const useHighlightRenderer = (marked) => {
    /* Create your custom renderer that uses highlight js on the code blocks */

    /*
        if users want, they can put the name of the langauge as the first line
        of their code block examples in the document
        if no langauge given, just use the default detection for highlight.js
    */
    const renderer = new Renderer();
    renderer.code = (code, lang) => {
        /*
            that is the format needed for marked to pick up the
            lang attribute, it must be next to the ``` with no space
            ```js               ```lang
            let x = y    ===    code
            ```                 ```
        */
        let highlightedCode;
        if (lang && highlightjs.getLanguage(lang)) {
            /*
                the highlight() signature is:
                highlight(langaugeName, textToHighlight,g igrnoreImproperSyntax)
                it returns a full object, but the highlighted code is inthe value property
            */
            highlightedCode = highlightjs.highlight(lang, code, true).value;
        } else {
            highlightedCode = highlightjs.highlightAuto(code).value;
        }

        return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
    };
    marked.setOptions({
        renderer,
        xhtml: false
      });
}

const useDefaultRenderer = (marked) => {
    /* Reset the renderer back to normal  */
    marked.setOptions({ renderer: new Renderer() });
}

const toggleHighlighting = (marked, useHighlighting) => {
    /* Due to performace, highlighting can't run while in edit mode, this turns it on and off */
    if (useHighlighting) {
        useHighlightRenderer(marked);
    } else {
        useDefaultRenderer(marked);
    }
}

export default toggleHighlighting;