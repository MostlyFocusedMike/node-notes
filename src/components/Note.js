import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import MDInputForm from './MDInputForm';
import MDPreview from './MDPreview';
import ModeBar from './ModeBar';
import TableOfContents from './TableOfContents';
import NotesAdapter from '../adapters';

class Note extends React.Component {
    constructor() {
        super();
        this.initState = {
            title: '',
            text: '',
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
        NotesAdapter.update({ ...this.state, oldTitle: this.props.match.params.fileName })
            .then(() => {
                if (!this.props.match.params.fileName) this.setState({ redirectNewFile: true });
            });
    }

    loadFile(title) {
        NotesAdapter.getOne(title)
            .then((text) => {
                this.setState({ title, text });
            });
    }

    // handles initial load of the page
    componentDidMount() {
        alert('mount');
        if (this.props.match.params.fileName) this.loadFile(this.props.match.params.fileName);
    }

    // handles every time we switch notes
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.fileName !== prevProps.match.params.fileName) {
            if (this.props.match.params.fileName) {
                this.loadFile(this.props.match.params.fileName);
            } else {
                this.setState(this.initState);
            }
        }
        // if (this.state.redirectMissingFile) {
        //     this.setState(this.initState);
        // }
    }

    render() {
        // if (this.state.redirectNewFile) return <Redirect to={`/notes/${this.state.title}`}/>;
        // whole page hard reloads on file creation, so we need to immediately redirect to the new file

        // if (this.state.redirectMissingFile) return <Redirect to="/"/>;
        // whole page hard reloads on file creation, so we need to immediately redirect to the new file
        return (
            <div className="note">
                {
                    this.props.viewInfo.editing ?
                        <MDInputForm
                            handleChange = {this.handleChange}
                            handleSubmit = {this.handleSubmit}
                            newNote = {this.state}
                            viewInfo={this.props.viewInfo}
                            toggleEdit={this.props.toggleEdit}
                        /> : ''
                }
                <MDPreview
                    note = {this.state}
                    viewInfo={this.props.viewInfo}
                />
                {
                    !this.props.viewInfo.editing ? <TableOfContents text={this.state.text} /> : ''
                }
                {
                    this.props.viewInfo.local ?
                        <ModeBar
                            viewInfo={this.props.viewInfo}
                            toggleEdit={this.props.toggleEdit}
                        /> : ''
                }
            </div>
        );
    }
}

Note.propTypes = {
    match: PropTypes.object,
    viewInfo: PropTypes.object,
    toggleEdit: PropTypes.func,
};


export default Note;
