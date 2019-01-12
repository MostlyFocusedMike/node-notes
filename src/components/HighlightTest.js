import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/dracula.css';

hljs.initHighlightingOnLoad();
const text = `
class MDPreview extends React.Component {
    constructor() {
      super()
      this.state = {
        markdown: "ok"
      }
    }
`
console.log(hljs.listLanguages());

class HighlightTest extends React.Component {
  render() {
    return (
        <pre>
            <code>
                { text }
            </code>
            This is a test
        </pre>
    )
  }
}

export default HighlightTest