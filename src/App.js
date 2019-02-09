import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import NotesDir from './components/NotesDir';
import Routes from './routes';
import MyProvider from './context/ContextProvider';

class App extends React.Component {
    constructor() {
        super();
        this.initState = {
            editing: false,
            local: false,
        };
        this.state = this.initState;
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            editing: !prevState.editing,
        }));
    }

    componentDidMount() {
        if (window.location.href.match('//localhost:')) this.setState({ local: true, editing: true });
    }

    addOne = () => {
        this.context.counter += 1;
    }

    render() {
        return (
            <MyProvider>
                <div className="App">
                    <NotesDir
                        viewInfo={this.state}
                    />
                    <Routes
                        viewInfo = {this.state}
                        toggleEdit = {this.toggleEdit}
                    />
                </div>
            </MyProvider>
        );
    }
}

export default hot(module)(App);
