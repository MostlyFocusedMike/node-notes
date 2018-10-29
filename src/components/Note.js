import React from 'react';
import MDInputForm from './MDInputForm'
import MDPreview from './MDPreview'
import ModeBar from './ModeBar'
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
    if (title) {
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
    } else {
      this.setState(this.initState)
    }
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
        {
          this.props.viewInfo.editing ? 
            <MDInputForm 
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            newNote = {this.state}
            viewInfo={this.props.viewInfo}
            toggleEdit={this.props.toggleEdit}
          /> : ""
          
        }

        <MDPreview 
          note = {this.state}
        />
        <ModeBar 
          viewInfo={this.props.viewInfo}
          toggleEdit={this.props.toggleEdit}
        />
      </div>
    );
  }
}

export default Note