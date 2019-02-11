import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';

class MDInputForm extends React.Component {
    scrolly = () => {
        const textArea = document.querySelector('#text');
        this.props.setScroll(textArea);
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
    setScroll: PropTypes.func,
    newNote: PropTypes.object,
};

MDInputForm.contextType = AppContext;

export default MDInputForm;
