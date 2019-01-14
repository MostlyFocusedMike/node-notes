import React from 'react';
import createMarkdown from '../helpers/createMarkdown';

class MDPreview extends React.Component {

    shouldComponentUpdate(prevProps, prevState) {
        return this.props.viewInfo.editing || prevProps.viewInfo.editing;
    }
    render() {
        console.log('I render', );
        const { title, text } = this.props.note;
        const markdown = createMarkdown(text, this.props.viewInfo.editing);
        return (
        <div id="md-preview">
            <h1>Preview of: {title}</h1>
            <div dangerouslySetInnerHTML={{__html: markdown}}></div>
        </div>
        )
    }
}

export default MDPreview