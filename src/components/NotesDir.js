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

    loadFiles = () => {
        NotesAdapter.list().then(files => this.setState(files));
    }

    componentDidMount() {
        this.loadFiles();
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
                <h2>{this.context.test}</h2>
                { this.context.isEditMode ? <button onClick={this.toggleNewFileModal}>New File</button> : '' }
                {
                    this.state.isNewFileModalVisibile ? <NewNoteModal
                        toggleNewFileModal={this.toggleNewFileModal}
                        loadFiles={this.loadFiles}
                    /> : ''
                }
                { this.state.files.map((file, idx) => <Link to={`/notes/${file}`} key={idx}>{file}</Link>) }
            </div>
        );
    }
}

NotesDir.propTypes = {
    viewInfo: PropTypes.object,
};

NotesDir.contextType = AppContext;

export default NotesDir;
