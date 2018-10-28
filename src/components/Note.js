import React from 'react';
import marked from 'marked'
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.fileName !== prevProps.match.params.fileName) {
      let path = require('../../backend/markdown/' + this.props.match.params.fileName + ".md")
      fetch(path)
      .then(response => {
        return response.text()
      })
      .then(text => {   
        this.setState((prevState) => ({
          title: this.props.match.params.fileName,
          text
        }));
      })
    }
  }

  render() {
    console.log(this.props.match.params.fileName)
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