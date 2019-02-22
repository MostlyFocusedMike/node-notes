import React from 'react';
import AppContext from '../context';
import Constants from '../constants';
import CurrentMDExtension from './CurrentMDExtension';
import PDFExtension from './PdfExtension';


class ExtensionViewer extends React.Component {
    handleClick = (e) => {
        e.preventDefault();
        this.context.changeExtension(e.target.dataset.extension);
    }

    showSelectedExtension = () => {
        switch (this.context.extension) {
        case Constants.EXTENSIONS.MARKDOWN:
            return <CurrentMDExtension note=''></CurrentMDExtension>;
        case Constants.EXTENSIONS.PDF:
            return <PDFExtension></PDFExtension>;
        default:
            return <CurrentMDExtension note=''></CurrentMDExtension>;
        }
    }

    render() {
        return (
            <div>
                I am the extension viewer!
                {
                    Object.values(Constants.EXTENSIONS).map((extension, idx) => {
                        return (
                            <button
                                key={idx}
                                id={`${extension}-btn`}
                                className='extension-btn'
                                onClick={this.handleClick}
                                data-extension={extension}
                            >
                                { extension }
                            </button>
                        );
                    })
                }

                {
                    this.showSelectedExtension()
                }
            </div>
        );
    }
}

ExtensionViewer.contextType = AppContext;

export default ExtensionViewer;
