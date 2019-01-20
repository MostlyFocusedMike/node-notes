import React from 'react';
import PropTypes from 'prop-types';
import createMarkdown from '../helpers/createMarkdown';

class MDPreview extends React.Component {
    render() {
        const { title, text } = this.props.note;
        const markdown = createMarkdown(text, true); // @TODO change this in the future with a button for context
        return (
            <div id="md-preview">
                <h1>Preview of: {title}</h1>
                <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
            </div>
        );
    }
}

MDPreview.propTypes = {
    note: PropTypes.object,
};

export default MDPreview;
