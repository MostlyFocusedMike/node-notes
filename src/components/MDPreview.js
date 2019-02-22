import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../helpers/createMarkdown';
import AppContext from '../context';

class MDPreview extends React.Component {
    constructor() {
        super();
        this.state = {
            currentScrollTop: 0,
            offset: 0,
            prevOffset: 0,
            focused: false,
        };
    }

    componentDidUpdate(prevProps) {
        /* if the scroll has been updated via the input form, update the mdPreview */
        if (prevProps.note.scroll !== this.props.note.scroll) {
            this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
            this.el.scrollTop += this.state.offset;
            this.setState({
                currentScrollTop: this.el.scrollTop,
                prevOffset: this.state.offset, // reset prevOffset
            });
        }
    }

    handlePreviewScroll = () => {
        /* when the user manually corrects the MDPreview's scroll position */
        if (this.state.focused) {
            const newOffset = (this.el.scrollTop - this.state.currentScrollTop);
            this.setState({
                offset: this.state.prevOffset + newOffset,
            });
        }
    }

    handleMouseEnter = () => {
        /* user is hovering over mdPreview */
        this.setState({ focused: true });
    }

    handleMouseLeave = () => {
        /* user has stopped hovering over mdPreview */
        this.setState({ focused: false });
    }

    render() {
        const { title, text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, cursorIndex, this.context.isEditMode); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                onScroll={this.handlePreviewScroll}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                ref={(el) => { this.el = el; }}
            >
                {/* <iframe
                    src="http://localhost:8100"
                    width="100%"
                    height="100%"
                >
                </iframe> */}
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
