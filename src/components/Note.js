import React from 'react';
import MDInputForm from './MDInputForm'
import MDPreview from './MDPreview'
import {NotesAdapter} from '../adapters'

class Note extends React.Component {

  constructor() {
    super()
    this.initState = {
      title: "",
      text: "",
    }
    this.state = this.initState
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    NotesAdapter.create(this.state)
    this.setState(this.initState)
  }

  render() {
    return (
      <div className="note">
        <MDInputForm 
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          newNote = {this.state}
        />
        <MDPreview 
          note = {this.state}
        />
      </div>
    );
  }
}

export default Note