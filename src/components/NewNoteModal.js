import React from 'react'
import NotesAdapter from '../adapters'
import { Link } from "react-router-dom";

class NewNoteModal extends React.Component {
  constructor() {
    super() 
    this.state = {
      title: "",
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
    this.props.toggleNewFileModal();
    console.log('file submitted')
  }

  render() {
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