import { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const safeTags = (str) => {
    return str;
}

const useHighlightRenderer = (marked, text, cursorIndex) => {
    /* Create your custom renderer that uses highlight js on the code blocks */
    const renderer = new Renderer();
    renderer.code = (code, lang) => {
        let highlightedCode;
        const ind = text.indexOf(code);
        const difference = Math.abs(ind - cursorIndex);
        if (difference < 2000) {
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
        }
        return `<pre><code class="hljs">${code.replace(/</g, '&lt;')}</code></pre>`;
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

const toggleHighlighting = (marked, text, useHighlighting, cursorIndex) => {
    /* highlighting can't run while in edit mode, this turns it on and off */
    console.log('cursorIndex here', cursorIndex);
    if (useHighlighting) {
        useHighlightRenderer(marked, text, cursorIndex);
    } else {
        useDefaultRenderer(marked);
    }
};

export default toggleHighlighting;
