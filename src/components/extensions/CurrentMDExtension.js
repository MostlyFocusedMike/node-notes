import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../../helpers/createMarkdown';
import AppContext from '../../context';

class CurrentMDExtension extends React.Component {
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
        /* if the scroll has been updated via the input form, update the current markdown extension */
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
        /* when the user manually corrects the CurrentMDExtension's scroll position */
        if (this.state.focused) {
            const newOffset = (this.el.scrollTop - this.state.currentScrollTop);
            this.setState({
                offset: this.state.prevOffset + newOffset,
            });
        }
    }

    handleMouseEnter = () => {
        /* user is hovering over current markdown extension */
        this.setState({ focused: true });
    }

    handleMouseLeave = () => {
        /* user has stopped hovering over current markdown extension */
        this.setState({ focused: false });
    }

    render() {
        const { text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, cursorIndex, this.context.isEditMode); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                onScroll={this.handlePreviewScroll}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
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

CurrentMDExtension.propTypes = {
    note: PropTypes.object,
};

CurrentMDExtension.contextType = AppContext;

export default CurrentMDExtension;
