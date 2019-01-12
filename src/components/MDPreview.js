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

  createCustomRenderer() {
    //   alert('creating new renderer');
      // Create your custom renderer.
        const renderer = new Renderer();
        renderer.code = (code) => {
        const language = 'js';
        const validLang = !!(language && highlightjs.getLanguage(language));
        console.log('valid: ', validLang);
        //   // Highlight only if the language is valid.
        const highlighted = highlightjs.highlight(language, code, true).value;
        //   // Render the highlighted code with `hljs` class.
        return `<pre><code class="hljs">
        ${highlightjs.highlightAuto(code).langauge}
        ${highlighted}
</code></pre>`;
        };

        // Set the renderer to marked.
        marked.setOptions({ renderer });
  }

  resetRenderer() {
    marked.setOptions({ renderer: new Renderer() });
  }
  render() {
    const { title, text } = this.props.note;
    console.log('view info:', this.props.viewInfo);
    !this.props.viewInfo.editing ? this.createCustomRenderer() : this.resetRenderer();
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