import React from 'react'
import NotesAdapter from '../adapters'
import { Redirect } from 'react-router'

class NewNoteModal extends React.Component {
  constructor() {
    super() 
    this.state = {
      title: "",
      redirectNewFile: false,
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    NotesAdapter.create(this.state)
      .then(() => {
        this.setState({
          redirectNewFile: true,
        })
      })
    console.log('file submitted')
  }

  render() {
    if (this.state.redirectNewFile) {
      // whole page hard reloads on file creation, so we need to immediately redirect to the new file
      console.log('redirected new file')
      console.log('title:', this.state.title)
      return <Redirect to={`/notes/${this.state.title}`}/>;
    }
    return (
      <div id="new-file-modal">
        <h1>I am the new file modal</h1>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label>File Name</label>
          <input type="text" name="title"/>
          <p>Warning: creating a new file will destroy any unsaved changes. Be sure to save your current file</p>
          <button onClick={this.props.toggleNewFileModal}>Cancel</button>
          <button>Create</button>
        </form>
      </div> 
    )
  }
}

export default NewNoteModal