import React from 'react';
import PropTypes from 'prop-types';

class MDInputForm extends React.Component {
    componentDidUpdate() {
        const textArea = document.querySelector('#text');
        console.log('textArea: ', textArea.scrollHeight);
        textArea.scrollTop = textArea.scrollHeight / 2;
    }

    scrolly = () => {
        const textArea = document.querySelector('#text');
        console.log('text ', textArea.scrollTop / textArea.scrollHeight);
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
                <textarea
                    id="text"
                    name="text"
                    value={this.props.newNote.text}
                    onChange={this.props.handleChange}
                    onScroll={this.scrolly}
                />
                <button>Save</button>
            </form>
        );
    }
}

MDInputForm.propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    newNote: PropTypes.object,
};

export default MDInputForm;
