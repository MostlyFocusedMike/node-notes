import React from 'react'


class MDInputForm extends React.Component {
  constructor() {
    super()
    this.initState = {
      newNote: {
        title: "",
        text: "",
      }
    }
    this.state = this.initState
  }

  handleChange = (e) => {
    this.setState({
      newNote: {
      ...this.state.newNote,
      [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.props.createUser(this.state)
  }

  handleClear = (e) => {
    e.preventDefault()
    this.setState(this.initState)
  }


  render() {
    return (
      <form 
        onChange={this.handleChange} 
        onSubmit={this.handleSubmit}
      >
        <p>tester: {this.state.newNote.text}</p>
        <label htmlFor="title">title</label>
        <input 
          id="title" 
          name="title" 
          type="text"
          value={this.state.newNote.title}
        /> 
        <label htmlFor="text">text</label>
        <textarea 
          id="text" 
          name="text"
          value={this.state.newNote.text}
        />
        <button>Submit</button>
        <button onClick={this.handleClear}>Clear</button>
      </form>
    )
  }
}

export default MDInputForm