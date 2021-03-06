import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import AppContext from '../context';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow'; // TODO replace this with a theme you like


class MDInputForm extends React.Component {
    _setScroll = () => {
        /* figure out what scroll down percentage of the form */
        const scrollHeight = this.aceEditor.editor.session.doc.getAllLines().length * 16.5;
        const scrollTop = this.aceEditor.editor.getSession().$scrollTop;
        this.props.setScroll(scrollTop / scrollHeight);
    }

    _setCursorIndex = () => {
        /* convert aceEditor's column/row position info into raw index that preview can use */
        if (this.aceEditor) { // this gets run before the reference to aceEditor is made, somehow
            const pos = this.aceEditor.editor.session.doc.positionToIndex(this.aceEditor.editor.selection.getCursor());
            this.props.setCursorIndex(pos);
        }
    }

    componentDidMount() {
        /* configure the aceEditor settings */
        this.aceEditor.editor.getSession().setUseWrapMode(false); // no wrap is better for scroll
        this.aceEditor.editor.resize(); // allow ace to resize on window changes
        this.aceEditor.editor.setAutoScrollEditorIntoView(true); // if a user selects text out of view, scroll to fit
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
                    onCursorChange={this._setCursorIndex}
                    // onClick={this._setCursorIndex}
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
