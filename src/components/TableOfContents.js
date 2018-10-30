import React from "react"
import marked from "marked"

class TableOfContents extends React.Component {
  constructor() {
    super() 
    this.initState = {
      sections: []
    }
    this.state = this.initState
  }

  render() {
    return (
      <div> Table of contents</div>
    )
  }
}

export default TableOfContents