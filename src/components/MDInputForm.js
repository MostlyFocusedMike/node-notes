import React from 'react';
import PropTypes from 'prop-types';

class MDInputForm extends React.Component {
    render() {
        return (
            <form
                onChange={this.props.handleChange}
                onSubmit={this.props.handleSubmit}
            >
                <label htmlFor="title">title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={this.props.newNote.title}
                />
                <label htmlFor="text">text</label>
                <textarea
                    id="text"
                    name="text"
                    value={this.props.newNote.text}
                />
                <button>Save</button>
            </form>
        );
    }
}

MDInputForm.propTypes = {
    handleChange: PropTypes.function,
    handleSubmit: PropTypes.function,
    newNote: PropTypes.object,
};

export default MDInputForm;
