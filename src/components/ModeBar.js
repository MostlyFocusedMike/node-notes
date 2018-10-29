import React from 'react'

class ModeBar extends React.Component {
  render() {
    return (
      <div id="mode-bar">
        <h1>Currently in {this.props.viewInfo.editing ? "Editing" : "Viewing"} mode</h1>
        <button onClick={this.props.toggleEdit}>Toggle</button>
      </div>
    )
  }
}

export default ModeBar