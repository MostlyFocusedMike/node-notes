import React from 'react';
import MDInputForm from './MDInputForm'
import MDPreview from './MDPreview'
import ModeBar from './ModeBar'
import TableOfContents from './TableOfContents'
import {NotesAdapter} from '../adapters'
import { Route, Redirect } from 'react-router'

// state = {
//   redirectNewFile: false
// }

// handleSubmit () {
//   axios.post(/**/)
//     .then(() => this.setState({ redirectNewFile: true }));
// }

// render () {
//   const { redirectNewFile } = this.state;

//    if (redirectNewFile) {
//      return <Redirect to='/somewhere'/>;
//    }



class Note extends React.Component {

  constructor() {
    super()
    this.initState = {
      title: "",
      text: "",
      redirectNewFile: false,
      redirectMissingFile: false,
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
      .then(() => this.setState({ redirectNewFile: true }))
  }

  loadFile(title) {
    if (title) {
      try {
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
      } catch(err) {
        this.setState({
          redirectMissingFile: true
        })
      }
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
    if (this.state.redirectNewFile) {
      // whole page hard reloads on file creation, so we need to immediately redirect to the new file
      return <Redirect to={`/notes/${this.state.title}`}/>;
    }
    if (this.state.redirectMissingFile) {
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