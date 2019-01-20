import React from 'react';
import createMarkdown from '../helpers/createMarkdown';
import PropTypes from 'prop-types';

class MDPreview extends React.Component {

    render() {
        console.log('I render', );
        const { title, text } = this.props.note;
        const markdown = createMarkdown(text, true); //@TODO change this in the future with a button for context
        return (
        <div id="md-preview">
            <h1>Preview of: {title}</h1>
            <div dangerouslySetInnerHTML={{__html: markdown}}></div>
        </div>
        )
    }
}

export default MDPreview