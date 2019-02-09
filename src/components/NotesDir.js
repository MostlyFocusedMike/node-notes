import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesAdapter from '../adapters';
import NewNoteModal from './NewNoteModal';
import AppContext from '../context';


class NotesDir extends React.Component {
    constructor() {
        super();
        this.state = {
            files: [],
            isNewFileModalVisibile: false,
        };
    }

    loadFiles() {
        NotesAdapter.list().then(files => this.setState(files));
    }

    componentDidMount() {
        this.loadFiles();
    }

    isEditMode() {
        return this.props.viewInfo.editing && this.props.viewInfo.local;
    }

    toggleNewFileModal = () => {
        this.setState(prevState => ({
            isNewFileModalVisibile: !prevState.isNewFileModalVisibile,
        }));
    }

    render() {
        return (
            <div id="notes-dir">
                <h1>Files</h1>
                <AppContext.Consumer>
                    {context => (
                        <div>
                            <p>{context.counter}</p>
                            <button onClick={context.addOne}>Add</button>
                        </div>
                    )}
                </AppContext.Consumer>
                <h2>{this.context.test}</h2>
                { this.isEditMode() ? <button onClick={this.toggleNewFileModal}>New File</button> : '' }
                { this.state.isNewFileModalVisibile ? <NewNoteModal toggleNewFileModal={this.toggleNewFileModal} /> : '' }
                { this.state.files.map((file, idx) => <Link to={`/notes/${file}`} key={idx}>{file}</Link>) }
            </div>
        );
    }
}

NotesDir.propTypes = {
    viewInfo: PropTypes.object,
};

export default NotesDir;
