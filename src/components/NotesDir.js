import React from 'react'

class NotesDir extends React.Component {
  constructor() {
    super() 
    this.state = {
      files: []
    }
  }

  componentWillMount() {
    const files = require('../files.json')
    console.log(files)
    this.setState({files})
  }

  render() {
    return (
      <div id="notes-dir">
        <h1>Files</h1>
        {
          this.state.files.map((file) => {
            return <a href="#"> {file}</a>
          })
        }
      </div>
    )
  }
}

export default NotesDir