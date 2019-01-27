import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import NotesAdapter from '../adapters';

class NewNoteModal extends React.Component {
    constructor() {
        super();
        this.initState = {
            title: '',
            redirectNewFile: false,
        };
        this.state = this.initState;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        NotesAdapter.create(this.state)
            .then((res) => {
                if (res.msg) {
                    alert(res.msg);
                    throw new Error('Already Created the file');
                }
            })
            .then(() => {
                this.setState({ redirectNewFile: true });
            })
            .catch(console.log);
    }

    shouldComponentUpdate(prevState) {
        return this.state.title !== prevState.title;
    }

    render() {
        // this rerenders one too many times so we wind up redirecting twice before the modal finally disapears, not sure why it ever does
        if (this.state.redirectNewFile) {
            return <Redirect to={`/notes/${this.state.title}`}/>;
        }

        return (
            <div id="new-file-modal">
                <h1>I am the new file modal</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>File Name</label>
                    <input type="text" name="title" onChange={this.handleChange} />
                    <p>Warning: creating a new file will destroy any unsaved changes. Be sure to save your current file</p>
                    <button onClick={ this.props.toggleNewFileModal }>Cancel</button>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}

NewNoteModal.propTypes = {
    toggleNewFileModal: PropTypes.func,
};

export default NewNoteModal;
