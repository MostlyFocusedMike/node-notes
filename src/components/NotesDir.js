import React from 'react'
import NotesAdapter from '../adapters'
import { Link } from "react-router-dom";

class NotesDir extends React.Component {
  constructor() {
    super() 
    this.state = {
      files: [],
      isNewFileModalVisibile: true,
    }
  }

  componentWillMount() {
    const files = require('../files.json')
    this.setState({files})
  }

  reload() {
    NotesAdapter.reload()
  }

  isEditMode() {
    return this.props.viewInfo.editing && this.props.viewInfo.local 
  }

  toggleNewFileModal = () => {
    console.log('hello')
    this.setState((prevState) => ({
      isNewFileModalVisibile: !prevState.isNewFileModalVisibile
    }));
  }

  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    return (
      <div id="notes-dir">
        <h1>Files</h1>
        {
          this.isEditMode() ? 
          <button onClick={this.toggleNewFileModal}>New File</button> : ""
        }
        {
          this.state.isNewFileModalVisibile ?
          <div id="new-file-modal">
            <h1>I am the new file modal</h1>
            <form>
              <label>File Name</label>
              <input type="text" />
              <p>Warning: creating a new file will destroy any unsaved changes. Be sure to save your current file</p>
              <button onClick={this.toggleNewFileModal}>Cancel</button>
              <button>Create</button>
            </form>
          </div> : ""
        }
        {
          this.state.files.map((file, idx) => {
            return <Link to={`/notes/${file}`} key={idx}>{file}</Link>
          })
        }
        {
          this.isEditMode() ? 
          <button onClick={this.reload}>Reload</button> : ""

        }
      </div>
    )
  }
}

export default NotesDir