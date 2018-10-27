import React, { Component } from 'react';
import './App.css';
import MDImportForm from './components/MDImportForm'
import MDPreview from './components/MDPreview'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MDImportForm />
        <MDPreview />
      </div>
    );
  }
}

export default App;
