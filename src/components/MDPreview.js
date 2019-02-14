import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../helpers/createMarkdown';
import AppContext from '../context';

class MDPreview extends React.Component {
    componentDidUpdate() {
        this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
    }

    render() {
        const { title, text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, cursorIndex, this.context.isEditMode); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                ref={(el) => { this.el = el; }}
            >
                <h1>Preview of: {title}</h1>
                <div
                    dangerouslySetInnerHTML={{ __html: markdown }}
                    id="preview-text"
                ></div>
            </div>
        );
    }
}

MDPreview.propTypes = {
    note: PropTypes.object,
};

MDPreview.contextType = AppContext;

export default MDPreview;
