import React from 'react';
import marked from 'marked';
import createMarkdown from '../helpers/createMarkdown';

class MDPreview extends React.Component {
  renderWelcome() {
    return "# hello there \n ## start adding markdown to get started"
  }

  render() {
    const { title, text } = this.props.note;
    const markdown = createMarkdown(text);
    return (
      <div id="md-preview">
        <h1>Preview of: {title}</h1>
        <div dangerouslySetInnerHTML={{__html: markdown}}></div>
      </div>
    )
  }
}

export default MDPreview