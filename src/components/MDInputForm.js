import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import AppContext from '../context';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow'; // TODO replace this with a theme you like


class MDInputForm extends React.Component {
    _setScroll = () => {
        const textArea = document.querySelector('#text');
        this.props.setScroll(textArea);
    }

    _setCursorIndex = () => {
        const textArea = document.querySelector('#text');
        this.props.setCursorIndex(textArea);
    }

    componentDidMount() {
        this.aceEditor.editor.getSession().setUseWrapMode(true);
        this.aceEditor.editor.resize();
        this.aceEditor.editor.setAutoScrollEditorIntoView(true);
        console.log(this.aceEditor.editor);
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
                    theme="tomorrow"
                    editorProps={{
                        $blockScrolling: true,
                    }}
                    id="editor"
                    name="editor"
                    width="99%"
                    height="80vh"
                    ref={(aceEditor) => { this.aceEditor = aceEditor; }}
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
