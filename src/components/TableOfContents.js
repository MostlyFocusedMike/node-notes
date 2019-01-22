import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

class TableOfContents extends React.Component {
    constructor() {
        super();
        this.initState = {
            contents: [],
        };
        this.state = this.initState;
    }

    setContents(headings) {
        /* convert headings into table of contents */
        const contents = headings.map((text) => {
            const match = text.match(/<h(1|2|3) id="(.+)">(.+)</);
            return {
                padding: match[1],
                link: match[2],
                text: match[3],
            };
        });
        this.setState({ contents });
    }

    checkForHeadings() {
        /* see if there are any headings to convert */
        if (this.props.text) {
            const headings = marked(this.props.text).match(/<h(?:1|2|3).+>.+</g);
            if (headings) this.setContents(headings);
        }
    }

    componentDidMount() {
        this.checkForHeadings();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.text !== this.props.text) this.loadContents();
    }

    render() {
        return (
            <div id="table-of-contents">
                <h3>Table of contents</h3>
                <div id="contents">
                    <ul>
                        {
                            this.state.contents.map((section, idx) => (
                                <li className={`padding-lvl-${section.padding}`} key={idx}>
                                    <a href={`#${section.link}`}>{section.text}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

TableOfContents.propTypes = {
    text: PropTypes.string,
};

export default TableOfContents;
