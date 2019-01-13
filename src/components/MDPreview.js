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
    // Create your custom renderer.
    const renderer = new Renderer();
    renderer.code = (code) => {
        // if users want, they can put the name of the langauge as the first line
        const language = code.match(/(^\w+)\n/);
        if (language && highlightjs.getLanguage(language[1])) {
            let finalCode = code.replace((language[0]), ''); // language[0] includes the \n at the end
            const highlighted = highlightjs.highlight(language[1], finalCode, true).value;
            return `<pre><code class="hljs">${highlighted}</code></pre>`;
        }
        // otherwise, just use the default auto detection for highlight.js
        return `<pre><code class="hljs">${highlightjs.highlightAuto(code).value}</code></pre>`;
    };
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