import { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const useHighlightRenderer = (marked) => {
    /* Create your custom renderer that uses highlight js on the code blocks */
    const renderer = new Renderer();
    renderer.code = (code, lang) => {
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
        xhtml: false,
    });
};

const useDefaultRenderer = (marked) => {
    /* Reset the renderer back to normal  */
    marked.setOptions({ renderer: new Renderer() });
};

const toggleHighlighting = (marked, useHighlighting) => {
    /* highlighting can't run while in edit mode, this turns it on and off */
    if (useHighlighting) {
        useHighlightRenderer(marked);
    } else {
        useDefaultRenderer(marked);
    }
};

export default toggleHighlighting;
