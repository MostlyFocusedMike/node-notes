import React from 'react'
import { Link } from "react-router-dom";

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
            return <Link to={`/notes/${file}`}>{file}</Link>
          })
        }
      </div>
    )
  }
}

export default NotesDir