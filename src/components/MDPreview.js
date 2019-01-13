import React from 'react'
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

class MDPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      markdown: ""
    }
  }

  renderWelcome() {
    return "# hello there \n ## start adding markdown to get started"
  }

  useHighlightRenderer() {
    // Create your custom renderer.
    const renderer = new Renderer();
    renderer.code = (code) => {
        let highlightedCode;
        // if users want, they can put the name of the langauge as the first line
        const language = code.match(/(^\w+)\n/);
        if (language && highlightjs.getLanguage(language[1])) {
            const codeWithNoName = code.replace((language[0]), ''); // language[0] includes the \n at the end
            /*
                highlight() signature is:
                highlight(langaugeName, textToHighlight, igrnoreImproperSyntax)
                it returns a full object, but the highlighted code is inthe value property
            */
            highlightedCode = highlightjs.highlight(language[1], codeWithNoName, true).value;
        } else {
            // if no langauge given, just use the default detection for highlight.js
            highlightedCode = highlightjs.highlightAuto(code).value;
        }

        return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
    };
    marked.setOptions({ renderer });
  }

  useDefaultRenderer() {
    marked.setOptions({ renderer: new Renderer() });
  }

  setRenderer(isEditMode) {
    /* Due to performace, it can't run while in edit mode  */
    if (isEditMode) {
        this.useDefaultRenderer();
    } else {
        this.useHighlightRenderer();
    }
  }

  render() {
    const { title, text } = this.props.note;
    this.setRenderer(this.props.viewInfo.editing);
    const md = text || this.renderWelcome();
    const markdown = marked(md)
    return (
      <div id="md-preview">
        <h1>Preview of: {title}</h1>
        <div dangerouslySetInnerHTML={{__html: markdown}}></div>
      </div>
    )
  }
}

export default MDPreview