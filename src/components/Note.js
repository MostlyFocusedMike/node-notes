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
  }

  loadFile(title) {
    let path = require('../../backend/markdown/' + title + ".md")
    fetch(path)
    .then(response => {
      return response.text()
    })
    .then(text => {   
      this.setState((prevState) => ({
        title,
        text
      }));
    })
  }

  // handles initial load of the page 
  componentDidMount() {
    if (this.props.match.params.fileName) { this.loadFile(this.props.match.params.fileName) }
  }

  // handles every time we switch notes
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.fileName !== prevProps.match.params.fileName) { this.loadFile(this.props.match.params.fileName); }
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