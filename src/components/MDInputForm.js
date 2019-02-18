import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import AppContext from '../context';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow'; // TODO replace this with a theme you like


class MDInputForm extends React.Component {
    _setScroll = (info) => {
        // console.log('info: ', info);
        // const foo = this.aceEditor.editor.getSession()
        const foo = this.aceEditor.editor.session.doc.getAllLines().length * 16.5;
        // lines * 15 = fake scrollHeight
        console.log('foo: ', foo);
        const scrollTop = this.aceEditor.editor.getSession().$scrollTop;
        console.log('scrollTop: ', scrollTop);
        // length 32328.66916656494 px
        const preScrolltop = (scrollTop / foo);
        console.log('preScrolltop: ', preScrolltop);
        this.props.setScroll(preScrolltop);
    }

    // _setCursorIndex = () => {
    //     const textArea = document.querySelector('#text');
    //     this.props.setCursorIndex(textArea);
    // }

    componentDidMount() {
        // this.aceEditor.editor.getSession().setUseWrapMode(true);
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
                    onChangeScrollTop={()=> console.log('i am')}
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
