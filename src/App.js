import React from 'react';
import './App.css';
import NotesDir from './components/NotesDir'
import Routes from './routes'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NotesDir />
        <Routes />
      </div>
    );
  }
}

export default App;
