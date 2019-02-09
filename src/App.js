import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import NotesDir from './components/NotesDir';
import Routes from './routes';
import context from './context';

class App extends React.Component {
    componentDidMount() {
        if (window.location.href.match('//localhost:')) {
            this.context.isEditMode = true;
            this.context.isLocal = true;
        }
    }

    render() {
        return (
            <div className="App">
                <NotesDir />
                <Routes />
            </div>
        );
    }
}

App.contextType = context;


export default hot(module)(App);
