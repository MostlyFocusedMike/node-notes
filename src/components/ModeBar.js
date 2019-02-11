import React from 'react';
import PropTypes from 'prop-types';

class ModeBar extends React.Component {
    render() {
        const { toggleEditMode, isEditMode } = this.props;
        return (
            <div id='mode-bar'>
                <p>Currently in { isEditMode ? 'Editing' : 'Viewing' } mode</p>
                <button onClick={ toggleEditMode }>Toggle</button>
            </div>
        );
    }
}

ModeBar.propTypes = {
    toggleEditMode: PropTypes.func,
    isEditMode: PropTypes.bool,
};

export default ModeBar;
