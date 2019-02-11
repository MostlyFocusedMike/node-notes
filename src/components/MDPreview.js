import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../helpers/createMarkdown';
import AppContext from '../context';

class MDPreview extends React.Component {
    scrolly = () => {
        const textArea = document.querySelector('#md-preview');
        console.log('text ', textArea.scrollHeight);
    }

    componentDidUpdate() {
        console.log('scrollerino: ', this.el.scrollHeight);
        this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
    }

    render() {
        const { title, text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, this.context.isEditMode, cursorIndex); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                onScroll={this.scrolly}
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
