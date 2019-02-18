import React from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';
import AppContext from '../context';

import 'brace/mode/java';
import 'brace/theme/github';


class MDInputForm extends React.Component {
    _setScroll = () => {
        const textArea = document.querySelector('#text');
        this.props.setScroll(textArea);
    }

    _setCursorIndex = () => {
        const textArea = document.querySelector('#text');
        this.props.setCursorIndex(textArea);
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit}
            >
                <label htmlFor="title">title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={this.props.newNote.title}
                    onChange={this.props.handleChange}
                />
                <label htmlFor="text">text</label>
                <AceEditor
                    mode="markdown"
                    theme="github"
                    editorProps={{ $blockScrolling: true }}
                    id="text"
                    name="text"
                    value={this.props.newNote.text}
                    onChange={this.props.handleChange}
                    onScroll={this._setScroll}
                    onClick={this._setCursorIndex}
                />
                <button>Save</button>
            </form>
        );
    }
}

MDInputForm.propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    setScroll: PropTypes.func,
    setCursorIndex: PropTypes.func,
    newNote: PropTypes.object,
};

MDInputForm.contextType = AppContext;

export default MDInputForm;
