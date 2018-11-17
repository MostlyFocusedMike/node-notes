import React from 'react';
import MDInputForm from './MDInputForm'
import MDPreview from './MDPreview'
import ModeBar from './ModeBar'
import TableOfContents from './TableOfContents'
import NotesAdapter from '../adapters'
import { Route, Redirect } from 'react-router'

class Note extends React.Component {

  constructor() {
    super()
    this.initState = {
      title: "",
      text: "",
      redirectNewFile: false,
      redirectMissingFile: false,
    }
    this.state = this.initState;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    NotesAdapter.create(this.state)
      .then(() => {
        if (!this.props.match.params.fileName) this.setState({ redirectNewFile: true })
      })
  }

  loadFile(title) {
    if (title) {
      let path = require('../../markdown/' + title + ".md")
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
    try {
      if (this.props.match.params.fileName) { 
        this.loadFile(this.props.match.params.fileName) 
      }
    } catch (err) {
      this.setState({ redirectMissingFile: true })
    }
  }

  // handles every time we switch notes
  componentDidUpdate(prevProps, prevState, snapshot) {
    try {
      if (this.props.match.params.fileName !== prevProps.match.params.fileName) {
        this.loadFile(this.props.match.params.fileName)
      }
    } catch (err) {} // react updates faster than node can create the file 
  }

  render() {
    if (this.state.redirectNewFile) {
      // whole page hard reloads on file creation, so we need to immediately redirect to the new file
      console.log('redirected new file')
    }
    if (this.state.redirectMissingFile) {
      console.log('redirected missing file')
      // whole page hard reloads on file creation, so we need to immediately redirect to the new file
      return <Redirect to="/"/>;
    }
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
          viewInfo={this.props.viewInfo}
        />
        {
          !this.props.viewInfo.editing ? 
          <TableOfContents text={this.state.text} /> : ""
        }
        {
          this.props.viewInfo.local ?
          <ModeBar 
            viewInfo={this.props.viewInfo}
            toggleEdit={this.props.toggleEdit}
          /> : ""
        }
      </div>
    );
  }
}

export default Note