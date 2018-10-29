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
    this.setState({files})
  }

  render() {
    console.log('props', this.props)
    return (
      <div id="notes-dir">
        <h1>Files</h1>
        {
          this.props.viewInfo.editing && this.props.viewInfo.local ? 
          <Link to={`/`}>New File</Link> : ""
        }
        {
          this.state.files.map((file, idx) => {
            return <Link to={`/notes/${file}`} key={idx}>{file}</Link>
          })
        }
      </div>
    )
  }
}

export default NotesDir