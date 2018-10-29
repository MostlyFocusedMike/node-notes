import React from 'react';
import './App.css';
import NotesDir from './components/NotesDir'
import Routes from './routes'

class App extends React.Component {
  constructor() {
    super()
    this.initState = {
      editing: true,
      github: false 
    }
    this.state = this.initState
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing
    }));
  }


  render() {
    return (
      <div className="App">
        <NotesDir />
        <Routes 
          viewInfo = {this.state} 
          toggleEdit = {this.toggleEdit}
        />
      </div>
    );
  }
}

export default App;
