import React from 'react'

class ModeBar extends React.Component {
    render() {
        const { toggleEdit, viewInfo } = this.props;
        return (
            <div id="mode-bar">
                <p>Currently in { viewInfo.editing ? "Editing" : "Viewing" } mode</p>
                <button onClick={ toggleEdit }>Toggle</button>
            </div>
        )
    }
}

export default ModeBar