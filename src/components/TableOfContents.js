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

  loadContents() {
    if (this.props.text) {
      let sections = marked(this.props.text).match(/<h(?:1|2|3).+>.+</g).map(text => {
        let match = text.match(/<h(1|2|3) id="(.+)">(.+)</)
        return {
          padding: match[1],
          link: match[2],
          text: match[3],
        }
      })
      this.setState({ sections })
    }
  }

  componentDidMount() {
    this.loadContents()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.loadContents()
    }
  }
  render() {
    return (
      <div id="table-of-contents">
        <h3>Table of contents</h3>
        <div id="sections">
          <ul>
            {
              this.state.sections.map(section => (
                <li class={`padding-lvl-${section.padding}`}>
                  <a href={`#${section.link}`}>{section.text}</a>
                </li>
              ))
            }
          </ul>

        </div>
      </div>
    )
  }
}

export default TableOfContents