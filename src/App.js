import React from 'react';
import './App.css';
import NotesDir from './components/NotesDir'
import Note from './components/Note'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NotesDir />
        <Note />
      </div>
    );
  }
}

export default App;
