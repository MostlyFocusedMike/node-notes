import React from 'react'
import marked from 'marked'

class MDPreview extends React.Component {
  constructor() {
    super() 
    this.state = {
      markdown: ""
    }
  }

  componentWillMount() {
    const files = require('../files.json')
    console.log(files)

    for (let i=0; i < files.length; i++) {
      let path = require("../../backend/markdown/" + files[i] + ".md");
      fetch(path)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState((prevState) => ({
          markdown: prevState.markdown + marked(text)
        }));
      })
    }


  }
  render() {
    const { markdown } = this.state;
    return (
      <div>
        <h1>Preview</h1>
        <section>
          <article dangerouslySetInnerHTML={{__html: markdown}}></article>
        </section>
      </div>
    )
  }
}

export default MDPreview