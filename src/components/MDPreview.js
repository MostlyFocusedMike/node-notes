import React from 'react'
import marked from 'marked'

class MDPreview extends React.Component {
  constructor() {
    super() 
    this.state = {
      markdown: ""
    }
  }

  render() {
    const { title, text } = this.props.note;
    const markdown = marked(text)
    return (
      <div id="md-preview">
        <h1>Preview of: {title}</h1>
        <div dangerouslySetInnerHTML={{__html: markdown}}></div>
      </div>
    )
  }
}

export default MDPreview