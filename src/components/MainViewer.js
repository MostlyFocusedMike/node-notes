import React from 'react';
import PropTypes from 'prop-types';
import MDInputForm from './MDInputForm';
import MDPreview from './MDPreview';
import TableOfContents from './TableOfContents';
import NotesAdapter from '../adapters';
import AppContext from '../context';

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

    loadFile = (title) => {
        NotesAdapter.getOne(title)
            .then((text) => {
                this.setState({ title, text });
            });
    }

    // handles initial load of the page
    componentDidMount() {
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
    }

    render() {
        return (
            <div className="main-viewer">
                {
                    this.context.isEditMode ?
                        <MDInputForm
                            handleChange = {this.handleChange}
                            handleSubmit = {this.handleSubmit}
                            newNote = {this.state}
                            viewInfo={this.context}
                            toggleEditMode={this.props.toggleEditMode}
                        /> : ''
                }
                <MDPreview note = {this.state} />
                {
                    !this.context.isEditMode ? <TableOfContents text={this.state.text} /> : ''
                }
            </div>
        );
    }
}

Note.propTypes = {
    match: PropTypes.object,
    viewInfo: PropTypes.object,
    toggleEditMode: PropTypes.func,
};

Note.contextType = AppContext;

export default Note;
