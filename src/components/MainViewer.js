import React from 'react';
import PropTypes from 'prop-types';
import MDInputForm from './MDInputForm';
import TableOfContents from './TableOfContents';
import NotesAdapter from '../adapters';
import AppContext from '../context';
import ExtensionViewer from './ExtensionViewer';

class Note extends React.Component {
    constructor() {
        super();
        this.initState = {
            title: '',
            text: '',
            scroll: 0,
            cursorIndex: 0,
        };
        this.state = this.initState;
    }

    handleChange = (value) => {
        /*  aceEditor and standard inputs send data differently
            input send e.target.value, ace just send the full editor text value
        */
        if (value.target) {
            this.setState({
                [value.target.name]: value.target.value,
            });
        } else {
            this.setState({
                text: value,
            });
        }
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

    setScroll = (scrollTop) => {
        this.setState({ scroll: scrollTop });
    }

    setCursorIndex = (position) => {
        this.setState({ cursorIndex: position });
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
                            setScroll = {this.setScroll}
                            setCursorIndex = {this.setCursorIndex}
                        /> : ''
                }
                <ExtensionViewer note={this.state} />
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
