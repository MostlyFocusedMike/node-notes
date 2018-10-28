import React from 'react';
import './App.css';
import MDInputForm from './components/MDInputForm'
import MDPreview from './components/MDPreview'
import NotesDir from './components/NotesDir'
import {NotesAdapter} from './adapters'

class App extends React.Component {
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
      <div className="App">
        <NotesDir />
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

export default App;
