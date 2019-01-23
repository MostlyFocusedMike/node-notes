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
                } else {
                    alert('created!');
                    console.log('res: ', res);
                    alert('read the log!');
                }
            })
            .then(() => {
                this.setState({ redirectNewFile: true });
            });
    }

    // componentDidUpdate =() => {
    //     if (this.state.redirectNewFile) {
    //         this.setState({
    //             redirectNewFile: false,
    //         });
    //     }
    // }

    shouldComponentUpdate(prevState) {
        return this.state.title !== prevState.title;
    }

    render() {
        console.log('title: ', this.state.title);
        const files = require('../files.json');
        console.log('files: ', files);
        if (this.state.redirectNewFile && files.includes(this.state.title)) {
            console.log('Redirected here!');
            this.props.toggleNewFileModal();
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
