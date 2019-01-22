import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesAdapter from '../adapters';
import NewNoteModal from './NewNoteModal';


class NotesDir extends React.Component {
    constructor() {
        super();
        this.state = {
            files: [],
            isNewFileModalVisibile: false,
        };
    }

    componentDidMount() {
        const files = require('../files.json');
        this.setState({ files });
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
                { this.isEditMode() ? <button onClick={this.toggleNewFileModal}>New File</button> : '' }
                { this.state.isNewFileModalVisibile ? <NewNoteModal toggleNewFileModal={this.toggleNewFileModal} /> : '' }
                { this.state.files.map((file, idx) => <Link to={`/notes/${file}`} key={idx}>{file}</Link>) }
                { this.isEditMode() ? <button onClick={NotesAdapter.reload}>Reload</button> : '' }
            </div>
        );
    }
}

NotesDir.propTypes = {
    viewInfo: PropTypes.object,
};


export default NotesDir;
