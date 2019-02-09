import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import NotesDir from './components/NotesDir';
import Routes from './routes';
import AppContext from './context';
import ModeBar from './components/ModeBar';

class App extends React.Component {
    state = {
        render: true,
    }

    componentDidMount() {
        this.context.checkIfLocal();
    }

    render() {
        console.log('editmode: ', this.context.isEditMode);
        return (
            <React.Fragment >
                {
                    this.state.render ? <div className="App">
                        <NotesDir />
                        <Routes />
                        {
                            this.context.isLocal ? <ModeBar
                                isEditMode={ this.context.isEditMode }
                                toggleEditMode={ this.context.toggleEditMode }
                            /> : ''
                        }

                    </div> : ''
                }
            </React.Fragment>
        );
    }
}

App.contextType = AppContext;

export default hot(module)(App);
