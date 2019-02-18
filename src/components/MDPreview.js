import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../helpers/createMarkdown';
import AppContext from '../context';

class MDPreview extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.note.scroll !== this.props.note.scroll) {
            this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
        }
    }

    scroll = () => {
        console.log("height: ", this.el.scrollHeight);
        // length: 36322.22265625 px
        // height: 36841
    }

    render() {
        const { title, text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, cursorIndex, this.context.isEditMode); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                onScroll={this.scroll}
                ref={(el) => { this.el = el; }}
            >
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
