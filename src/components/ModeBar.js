import React from 'react';
import PropTypes from 'prop-types';

class ModeBar extends React.Component {
    render() {
        const { toggleEdit, viewInfo } = this.props;
        return (
            <div id='mode-bar'>
                <p>Currently in { viewInfo.editing ? 'Editing' : 'Viewing' } mode</p>
                <button onClick={ toggleEdit }>Toggle</button>
            </div>
        );
    }
}

ModeBar.propTypes = {
    toggleEdit: PropTypes.func,
    viewInfo: PropTypes.object,
};

export default ModeBar;
