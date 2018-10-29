import React from 'react'

class ModeBar extends React.Component {
  render() {
    return (
      <div id="mode-bar">
        <h1>Currently in {this.props.editing ? "Editing" : "Viewing"} mode</h1>
        <button onClick={this.props.toggleMode}>Toggle</button>
      </div>
    )
  }
}

export default ModeBar