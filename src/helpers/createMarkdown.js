import marked from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const configureRenderer = (markedEngine, text, cursorIndex, isSelectiveHighlight) => {
    /**  Create your custom renderer that uses highlight js
     @param markedEngine: obj, the marked library object
     @param text: str, text to be converted to markdown
     @param cursorIndex: int, where the user places their cursor
     @param isSelectiveHighlight: bool, avoids lagging on long files if true
    */

    const renderer = new markedEngine.Renderer();
    renderer.code = (code, lang) => {
        const ind = text.indexOf(code);
        const difference = Math.abs(ind - cursorIndex);
        if (!isSelectiveHighlight || difference < 2000) {
            let highlightedCode;
            if (lang && highlightjs.getLanguage(lang)) { // if there is a lang and it's highlight.js recognizes it
                /*
                    highlight(langaugeName, textToHighlight, igrnoreImproperSyntax)
                    - it returns a full object, the highlighted code is inthe value property
                */
                highlightedCode = highlightjs.highlight(lang, code, true).value;
                console.log('highlightedCode: ', highlightedCode);
            } else {
                highlightedCode = highlightjs.highlightAuto(code).value;
            }
            return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
        }

        return `<pre><code class="hljs">${code.replace(/</g, '&lt;')}</code></pre>`;
    };

    markedEngine.setOptions({
        renderer,
        xhtml: false,
    });
};

const renderWelcome = () => {
    /* create the welcome message */
    return `
# hello there
## start adding markdown to get started
- don't know where to start? check out the main help page I have yet to write
- [This markdown crash course](http://blog.kugghuset.se/2015/11/20/markdown-crash-course.html) teaches you how to use it in like 5 minutes`;
};

const createMarkdown = (text, cursorIndex, isSelectiveHighlight) => {
    /* returns the final markdown */
    configureRenderer(marked, text, cursorIndex, isSelectiveHighlight); // we only want marked to use special highlighing when not in edit mode
    const md = text || renderWelcome();
    return marked(md);
};

export default createMarkdown;
