import React from 'react';
import MDInputForm from './MDInputForm'
import MDPreview from './MDPreview'
import ModeBar from './ModeBar'
import {NotesAdapter} from '../adapters'
import { Route, Redirect } from 'react-router'

// state = {
//   redirect: false
// }

// handleSubmit () {
//   axios.post(/**/)
//     .then(() => this.setState({ redirect: true }));
// }

// render () {
//   const { redirect } = this.state;

//    if (redirect) {
//      return <Redirect to='/somewhere'/>;
//    }



class Note extends React.Component {

  constructor() {
    super()
    this.initState = {
      title: "",
      text: "",
      redirect: false
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
      .then(() => this.setState({ redirect: true }))
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
    if (this.state.redirect) {
      return <Redirect to={`/notes/${this.state.title}`}/>;
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