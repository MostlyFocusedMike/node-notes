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
        if (prevProps.note.scroll !== this.props.note.scroll) {
            this.el.scrollTop = this.el.scrollHeight * this.props.note.scroll;
            this.el.scrollTop += this.state.offset;
            this.setState({
                currentScrollTop: this.el.scrollTop,
                prevOffset: this.state.offset,
            }, () => {
                console.log('currentScrollTop: ', this.state.currentScrollTop);
                console.log('offset: ', this.state.offset);
            });
        }
    }

    scroll = () => {
        if (this.state.focused) {
            let newOffset = (this.el.scrollTop - this.state.currentScrollTop);
            this.setState(prevState => ({
                offset: this.state.prevOffset + newOffset,
            }), () => {
                console.log('\noffSet post set state: ', this.state.offset);
            });
        }

        // length: 36322.22265625 px
        // height: 36841
    }

    focus = () => {
        console.log('hi: ');
        this.setState({
            focused: true,
        });
    }

    blur = () => {
        this.setState({
            focused: false,
        });
    }

    render() {
        const { title, text, cursorIndex } = this.props.note;
        const markdown = createMarkdown(text, cursorIndex, this.context.isEditMode); // @TODO change this in the future with a button for context
        return (
            <div
                id="md-preview"
                onScroll={this.scroll}
                onMouseEnter={this.focus}
                onMouseLeave={this.blur}
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
